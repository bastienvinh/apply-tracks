// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

fn main() {
  apply_track_lib::run()
	// /Users/bastienvinh/Library/Application Support/com.bastienvinh.apply-track/apply-track.sqlite3
}
