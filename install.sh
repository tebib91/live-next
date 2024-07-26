#!/bin/bash

# Function to print a progress bar

# Function to log a message and update progress
log_message() {
  local message=$1
  printf "\n$(date +"%Y-%m-%d %H:%M:%S") - $message\n"
}

# Update and install Node.js and npm packages
log_message "Updating system packages..." 0
sudo apt update -y > /dev/null 2>&1 && log_message "System packages updated successfully." 4 || { log_message "Failed to update system packages."; exit 1; }

log_message "Installing build-essential and libssl..." 8
sudo apt-get install -y build-essential checkinstall libssl-dev > /dev/null 2>&1 && log_message "Build-essential and libssl installed successfully." 12 || { log_message "Failed to install Build-essential and libssl."; exit 1; }

log_message "Installing Node.js and npm packages..." 16
curl -fsSL https://deb.nodesource.com/setup_16.x | sudo -E bash - > /dev/null 2>&1
sudo apt install -y nodejs > /dev/null 2>&1 && log_message "Node.js and npm packages installed successfully." 20 || { log_message "Failed to install Node.js and npm packages."; exit 1; }

log_message "Cloning repository..." 24
git clone -b main https://github.com/tebib91/live-next.git /home/live-next > /dev/null 2>&1 && log_message "Repository cloned successfully." 28 || { log_message "Failed to clone repository."; exit 1; }

# Navigate to the app directory
cd /home/live-next || { log_message "Failed to navigate to app directory."; exit 1; }

# Install project dependencies
log_message "Installing project dependencies..." 32
npm install > /dev/null 2>&1 && log_message "Project dependencies installed successfully." 36 || { log_message "Failed to install project dependencies."; exit 1; }

# Build the project
log_message "Building project..." 40
npm run build > /dev/null 2>&1 && log_message "Project built successfully." 44 || { log_message "Failed to build project."; exit 1; }

# Configure and start the project as a systemd service
log_message "Configuring systemd service..." 48
cat <<EOF | sudo tee /etc/systemd/system/live-next.service > /dev/null
[Unit]
Description=Live-Next Service
After=network.target

[Service]
User=$(whoami)
WorkingDirectory=/home/live-next
ExecStart=/usr/bin/npm start
Restart=always
Environment=PORT=9999

[Install]
WantedBy=multi-user.target
EOF
log_message "Systemd service configured successfully." 52

# Reload systemd to pick up the changes
log_message "Reloading systemd..." 56
sudo systemctl daemon-reload > /dev/null 2>&1 && log_message "Systemd reloaded successfully." 69 || { log_message "Failed to reload systemd."; exit 1; }

# Start and enable the service
log_message "Starting systemd service..." 70
sudo systemctl start live-next > /dev/null 2>&1 && log_message "Systemd service started successfully." 82 || { log_message "Failed to start systemd service."; exit 1; }
log_message "Enabling systemd service..." 83
sudo systemctl enable live-next > /dev/null 2>&1 && log_message "Systemd service enabled successfully." 97 || { log_message "Failed to enable systemd service."; exit 1; }

# Success message
log_message "Setup completed successfully!" 100
