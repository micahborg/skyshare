# ### Terraform configuration for Google Cloud Firestore with TTL configuration ###
# resource "google_firestore_database" "default" {
#   name        = "(default)"
#   project     = var.project_id
#   location_id = var.region
#   type        = "FIRESTORE_NATIVE"
# }

# # TTL configuration on calls collection
# resource "google_firestore_field" "calls_ttl" {
#   project    = var.project_id
#   collection = "calls"
#   field      = "createdAt"

#   ttl_config {}
# }

### Terraform configuration for a TURN server on Google Cloud Platform ###
# This configuration creates a VM instance with Coturn installed and sets up firewall rules.
resource "google_compute_address" "turn_static_ip" {
  name   = "turn-static-ip"
  region = var.region
}

resource "google_compute_instance" "turn_server" {
  name         = "turn-server"
  machine_type = "e2-micro"
  zone         = var.zone
  tags         = ["turn"]

  boot_disk {
    auto_delete = true
    device_name = "turn-server"

    initialize_params {
      image = "projects/debian-cloud/global/images/debian-12-bookworm-v20250610"
      size  = 10
      type  = "pd-balanced"
    }

    mode = "READ_WRITE"
  }

  can_ip_forward      = false
  deletion_protection = false
  enable_display      = false

  labels = {
    goog-ec-src = "vm_add-tf"
  }

  network_interface {
    access_config {
      nat_ip       = google_compute_address.turn_static_ip.address
      network_tier = "PREMIUM"
    }
    queue_count = 0
    stack_type  = "IPV4_ONLY"
    subnetwork  = var.subnetwork_self_link
  }

  scheduling {
    automatic_restart   = true
    on_host_maintenance = "MIGRATE"
    preemptible         = false
    provisioning_model  = "STANDARD"
  }

  service_account {
    email  = var.turn_service_account_email
    scopes = [
      "https://www.googleapis.com/auth/devstorage.read_only",
      "https://www.googleapis.com/auth/logging.write",
      "https://www.googleapis.com/auth/monitoring.write",
      "https://www.googleapis.com/auth/service.management.readonly",
      "https://www.googleapis.com/auth/servicecontrol",
      "https://www.googleapis.com/auth/trace.append"
    ]
  }

  shielded_instance_config {
    enable_integrity_monitoring = true
    enable_secure_boot          = false
    enable_vtpm                 = true
  }

  # need to fix this so it actually works (multiline doesn't function properly), only runs `#!/bin/bash`
  metadata_startup_script = <<-EOF
    #!/bin/bash
    sudo apt-get update
    sudo apt-get install coturn -y
    sudo systemctl enable coturn
    sudo systemctl restart coturn
    echo 'TURN server installed and started.'
  EOF
}

resource "google_compute_firewall" "turn_ports" {
  name    = "allow-turn-traffic"
  network = "default"

  allow {
    protocol = "udp"
    ports    = ["3478"]
  }

  allow {
    protocol = "tcp"
    ports    = ["3478"]
  }

  direction     = "INGRESS"
  source_ranges = ["0.0.0.0/0"]
  target_tags   = ["turn"]
}