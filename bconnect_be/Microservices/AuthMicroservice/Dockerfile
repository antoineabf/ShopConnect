# Use an official Python runtime as a parent image
FROM python:3.9-slim

# Set environment variables
ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED 1

# Set the working directory in the container
WORKDIR /app

# Copy the dependencies file to the working directory
COPY requirements.txt .
COPY db_script.py .

# Install any needed packages specified in requirements.txt
RUN pip install --no-cache-dir -r requirements.txt
RUN python db_script.py

# Copy the rest of the application code to the working directory
COPY . .

# Expose the port the app runs on
EXPOSE 8080

# Run the application
CMD ["python", "app.py", "--port", "8080"]
