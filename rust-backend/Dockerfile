# Use the latest Rust image as a base
FROM rust:1.76 as builder

# Set the working directory
WORKDIR /usr/src/rust-backend

# Install system dependencies required for Anchor and Solana
RUN apt-get update && \
    apt-get install -y pkg-config build-essential libssl-dev

# Install the latest Solana CLI
RUN sh -c "$(curl -sSfL https://release.solana.com/v1.18.3/install)"

# Install the latest Anchor CLI
RUN cargo install --git https://github.com/project-serum/anchor anchor-cli --locked

# Copy your Rust project files into the Docker image
COPY . .

# Build your Rust project
RUN cargo build --release

# For the final image, use a Debian buster slim image to keep it light
FROM debian:buster-slim

# Copy the Solana binaries
COPY --from=builder /root/.local/share/solana/install/active_release/bin /usr/local/bin

# Copy the built executable and any other necessary files from the builder stage
COPY --from=builder /usr/src/rust-backend/target/release/your_executable /usr/local/bin/your_executable

# Set any required environment variables
ENV RUST_LOG=info

# Command to run your application
# CMD ["your_executable"]
