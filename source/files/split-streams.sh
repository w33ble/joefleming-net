#!/bin/bash

# Check if an input file is provided
if [ "$#" -ne 1 ]; then
    echo "Usage: $0 <input_m3u_file>"
    exit 1
fi

# Input M3U file from the first argument
input_file="$1"
output_path="./radio"

# Check if the input file exists
if [ ! -f "$input_file" ]; then
    echo "Error: File '$input_file' not found!"
    exit 1
fi

# Initialize a counter for the output files
counter=1

# Create the output files from the input
{
  read # Ignore the first "#EXTM3U" line

  # Read the input file line by line
  while IFS= read -r line1 && IFS= read -r line2; do
      # Create a new output file name with zero-padded count (e.g., stream_01.m3u)
      output_file="$output_path/$(printf "stream_%02d.m3u" "$counter")"

      # Write the lines to the output file
      echo "#EXTM3U" > "$output_file"
      echo "$line1" >> "$output_file"  # Write metadata
      echo "$line2" >> "$output_file" # Write URL

      # Increment the counter
      ((counter++))
  done
} < "$input_file"

echo "Split completed. Created $((counter - 1)) M3U files."