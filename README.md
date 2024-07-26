# live-next: A Simple, Easy-to-Use Personal Cloud System

live-next is an open-source project that aims to provide a user-friendly personal cloud experience built around the Docker ecosystem. It allows you to easily deploy and manage various self-hosted applications on your own hardware, giving you control and privacy over your data.

## Features

- **Simple and Elegant User Interface:** live-next boasts a minimalist and intuitive interface that streamlines container management.
- **Docker Integration:** Leverage the vast ecosystem of Docker applications to build your personalized cloud with ease.
- **Pre-built App Store:** live-next offers a curated selection of popular self-hosted apps readily available for deployment.
- **Customizable:** You can install and manage any containerized application beyond the pre-built store.
- **Open Source:** live-next is a community-driven project, allowing for contributions and customization.

## Getting Started

### Prerequisites

- A spare computer or server with sufficient resources.
- Basic understanding of Docker concepts (optional).

## Development environment

1. Install `sudo apt-get install build-essential libudev-dev`. You'll need libudev to build libusb if a prebuild is not available.
2. If you get an error 'Error listing containers: Error: connect EACCES /var/run/docker.sock', run `sudo chmod o+rw /var/run/docker.sock`.

### Installation

1. Download the live-next image for your system architecture from the [official website](https://live-os.io/).
2. Follow the installation guide for your chosen platform (e.g., Raspberry Pi, x86-64 machine) to flash the image onto a storage device.
3. Boot your system with the live-next image and run the following command:

   ```sh
   curl -fsSL https://raw.githubusercontent.com/tebib91/live-next/main/install.sh | sudo bash
   ```

Here is the updated `README.md` file for the `live-next` project in Markdown format:

````markdown
## live-next: A Simple, Easy-to-Use Personal Cloud System

live-next is an open-source project that aims to provide a user-friendly personal cloud experience built around the Docker ecosystem. It allows you to easily deploy and manage various self-hosted applications on your own hardware, giving you control and privacy over your data.

## Features

- **Simple and Elegant User Interface:** live-next boasts a minimalist and intuitive interface that streamlines container management.
- **Docker Integration:** Leverage the vast ecosystem of Docker applications to build your personalized cloud with ease.
- **Pre-built App Store:** live-next offers a curated selection of popular self-hosted apps readily available for deployment.
- **Customizable:** You can install and manage any containerized application beyond the pre-built store.
- **Open Source:** live-next is a community-driven project, allowing for contributions and customization.

## Getting Started

### Prerequisites

- A spare computer or server with sufficient resources.
- Basic understanding of Docker concepts (optional).

## Development environment

1. Install `sudo apt-get install build-essential libudev-dev`. You'll need libudev to build libusb if a prebuild is not available.
2. If you get an error 'Error listing containers: Error: connect EACCES /var/run/docker.sock', run `sudo chmod o+rw /var/run/docker.sock`.

### Installation

1. Download the live-next image for your system architecture from the [official website](https://live-os.io/).
2. Follow the installation guide for your chosen platform (e.g., Raspberry Pi, x86-64 machine) to flash the image onto a storage device.
3. Boot your system with the live-next image and run the following command:
   ```sh
   curl -fsSL https://raw.githubusercontent.com/tebib91/live-next/develop/install.sh | sudo bash
   ```
````

## Usage

- Access the live-next web interface through your browser at `http://your_server_ip:8080`.
- Login with the default credentials (provided during installation or documented).
- Explore the user interface to browse the pre-built app store, search for additional containers, or manage existing deployments.
- Configure your chosen applications according to their specific needs.

## Resources

- Official Website: [https://liveos.io/](https://liveos.io/)
- Documentation: [https://liveos.io/](https://liveos.io/) (Link might change, refer to official website for latest documentation)
- Community Forum: [https://github.com/topics/github-discussions](https://github.com/topics/github-discussions)

## Contributing

live-next welcomes contributions from the community. You can contribute by:

- Reporting bugs and suggesting improvements.
- Submitting pull requests with code changes.
- Participating in discussions and helping other users on the forum.

## License

live-next is licensed under the Apache License 2.0: [https://www.apache.org/licenses/LICENSE-2.0](https://www.apache.org/licenses/LICENSE-2.0).

## Contact

For any questions or feedback regarding live-next, feel free to reach out to the community forum or explore the official website for contact details.
