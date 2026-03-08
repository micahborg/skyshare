variable "project_id" {
  description = "GCP Project ID"
}

variable "region" {
  description = "GCP Region"
  default     = "us-central1"
}

variable "zone" {
  description = "GCP Zone"
  default     = "us-central1-a"
}

variable "turn_service_account_email" {
  description = "Service account email used by the TURN server VM"
  type        = string
  sensitive   = true
}

variable "subnetwork_self_link" {
  description = "Full self-link of the subnetwork to attach the TURN server to"
  type        = string
}