WORLD CUP 2026 — CIRCULAR/KNOCKOUT PREDICTION BRACKET
=====================================================
Ready-to-upload static website. No Node.js, database, or server code
required — these are plain HTML/CSS/JS files that run in the browser.

WHAT'S IN THIS FOLDER
---------------------
  bracket/            <- the whole app (upload this folder to your website)
  embed-snippet.html  <- the iframe code to paste into your landing page
  README.txt          <- this file


STEP 1 — UPLOAD
---------------
Upload the "bracket" folder to your web host (FTP, cPanel File Manager,
your site's file manager, etc.) so it ends up at:

    yoursite.com/bracket/

After uploading, the file layout on your server should look like:

    yoursite.com/bracket/index.html
    yoursite.com/bracket/_next/...

Test it by visiting  https://yoursite.com/bracket/  in a browser.
You should see the full interactive bracket.


STEP 2 — EMBED IT IN YOUR PAGE
------------------------------
In the landing-page section where you want the bracket to appear, paste
the iframe from "embed-snippet.html" (also shown here):

    <iframe
      src="/bracket/"
      title="World Cup 2026 Bracket"
      style="width:100%; height:900px; border:0; border-radius:16px;"
      loading="lazy">
    </iframe>

The app automatically fits itself to the iframe size — just change the
"height" value to suit your section (900px works well on desktop).


IMPORTANT — THE FOLDER NAME MUST BE "bracket"
---------------------------------------------
The asset paths are baked in to point at "/bracket/". So you must upload
into a folder named exactly "bracket" at your domain root.

If you need a DIFFERENT folder name (e.g. /predictions) or want it at the
root of a domain/subdomain, it must be re-built with that path. Ask and
it can be regenerated for your exact URL.


NOTES
-----
- Works on desktop and mobile (pinch-to-zoom and drag-to-pan on touch).
- Predictions are saved in each visitor's own browser (localStorage).
- Country flags use the visitor's device emoji, so they look slightly
  different on Windows vs Mac/iPhone, but are always readable.
