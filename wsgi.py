"""WSGI entry point for production servers.

    gunicorn -w 4 -b 0.0.0.0:8000 wsgi:app

Most platforms (Render, Railway, Fly, Heroku) pick this up automatically.
"""

from app import app

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=8000)
