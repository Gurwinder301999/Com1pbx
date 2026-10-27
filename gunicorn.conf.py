"""Gunicorn configuration for the Com1 site.

    gunicorn -c gunicorn.conf.py wsgi:app

Every value can be overridden with an env var, so the same file works on a VPS,
in Docker and on a PaaS.
"""

import multiprocessing
import os

# 127.0.0.1 when nginx is in front; 0.0.0.0 when the platform routes directly.
bind = os.environ.get("GUNICORN_BIND", "0.0.0.0:8000")

# The app is small and blocking-free; 2 x cores is the usual sweet spot.
workers = int(os.environ.get("WEB_CONCURRENCY", multiprocessing.cpu_count() * 2 + 1))
worker_class = "sync"
threads = int(os.environ.get("GUNICORN_THREADS", "2"))

timeout = int(os.environ.get("GUNICORN_TIMEOUT", "60"))
graceful_timeout = 30
keepalive = 5

# Recycle workers periodically to blunt any slow leak.
max_requests = 2000
max_requests_jitter = 200

# Log to stdout/stderr so journald, Docker and PaaS log collectors pick it up.
accesslog = "-"
errorlog = "-"
loglevel = os.environ.get("GUNICORN_LOGLEVEL", "info")
access_log_format = '%({x-forwarded-for}i)s %(h)s "%(r)s" %(s)s %(b)s %(L)ss "%(a)s"'

# Drop privileges when started as root (common with systemd).
user = os.environ.get("GUNICORN_USER") or None
group = os.environ.get("GUNICORN_GROUP") or None

# Trust proxy headers from one hop (nginx).
forwarded_allow_ips = os.environ.get("FORWARDED_ALLOW_IPS", "127.0.0.1")

preload_app = False
