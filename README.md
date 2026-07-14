# John Midtbo Executive Portfolio

Static executive portfolio preview.

## Google Cloud Deployment

This repo is prepared for static hosting on Google Cloud Storage behind an HTTPS
Load Balancer and Cloud CDN. The workflow at
`.github/workflows/deploy-gcs.yml` deploys the tracked site files from a clean
checkout, so local untracked resume drafts and screenshots are not published.

Required GitHub Actions variables:

- `GCP_PROJECT_ID`: Google Cloud project ID.
- `GCS_BUCKET`: target bucket name, without `gs://`.
- `CDN_URL_MAP`: optional HTTPS load balancer URL map name for CDN invalidation.

Required GitHub Actions secrets:

- `GCP_WORKLOAD_IDENTITY_PROVIDER`: Workload Identity Provider resource name.
- `GCP_SERVICE_ACCOUNT`: deploy service account email.

Recommended production shape:

- Domain: `john.midtbo.com`
- Origin: private or public-read Cloud Storage bucket for static files
- Edge: external HTTPS Load Balancer with Google-managed certificate
- Cache: short TTL for HTML, longer TTL for CSS/JS/PDF assets
