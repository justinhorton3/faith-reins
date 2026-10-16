# Approved Shop release — transport retry

Approved by the owner in this conversation on October 16, 2026.

Retry delivery of the *same* current `main` website source to the existing https://www.faithreins.com/ Wix Headless site.

The first attempt at `187847b28520217ee29cfa1269b310bca130a711` failed with curl error 92 during Wix's multipart HTTP/2 upload, after successful build and category-route validation; the first retry did not resolve it.

Transport fix in commit `a42e3fcf2a745465b6d037f1614e29c407c7a1e2`:
- use multipart HTTP/1.1 with retry for transient network errors;
- exclude only obsolete barn-table and coffee-porch Shop hero web files from *deployment output*, and only when verified unused;
- retain all approved V7 originals, responsive new Shop hero, six categories, merch corner, disabled checkout.

This dedicated release marker triggers the same production Wix deployment workflow. No additional site content is authorized.
