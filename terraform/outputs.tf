output "turn_static_ip" {
  value = google_compute_address.turn_static_ip.address
}

# output "firestore_database_name" {
#   value = google_firestore_database.default.name
# }