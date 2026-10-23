"use client";

import { useRef, useState } from "react";
import Icon from "@/components/ui/Icon";
import { useToast } from "./Toast";

const MAX_MB = 4;
const ACCEPT = "image/jpeg,image/png,image/webp,image/avif,image/gif";

/**
 * images: [{ url, key, alt }]
 * onChange(nextImages)
 * sessionKeys: Set of keys uploaded during this editing session (safe to delete immediately)
 */
export default function ImageUploader({ images, onChange, sessionKeys }) {
  const { notify } = useToast();
  const inputRef = useRef(null);
  const [uploading, setUploading] = useState(0);
  const [drag, setDrag] = useState(false);

  async function uploadFiles(fileList) {
    const files = [...fileList].filter((f) => {
      if (!ACCEPT.split(",").includes(f.type)) {
        notify(`${f.name}: unsupported format`, "error");
        return false;
      }
      if (f.size > MAX_MB * 1024 * 1024) {
        notify(`${f.name}: larger than ${MAX_MB} MB`, "error");
        return false;
      }
      return true;
    });
    if (!files.length) return;

    setUploading((n) => n + files.length);
    const uploaded = [];
    for (const file of files) {
      try {
        const fd = new FormData();
        fd.append("file", file);
        fd.append("folder", "products");
        const res = await fetch("/api/admin/upload", { method: "POST", body: fd });
        const data = await res.json();
        if (!res.ok) throw new Error(data.error || "Upload failed");
        sessionKeys.add(data.key);
        uploaded.push({ url: data.url, key: data.key, alt: "" });
      } catch (err) {
        notify(`${file.name}: ${err.message}`, "error");
      } finally {
        setUploading((n) => n - 1);
      }
    }
    if (uploaded.length) {
      onChange([...images, ...uploaded]);
      notify(`${uploaded.length} image(s) uploaded to R2`);
    }
  }

  async function remove(index) {
    const img = images[index];
    onChange(images.filter((_, i) => i !== index));
    // Images uploaded in this session (not yet saved) are removed from R2 right away.
    // Previously-saved images are removed from R2 by the API when the product is saved.
    if (img.key && sessionKeys.has(img.key)) {
      sessionKeys.delete(img.key);
      fetch(`/api/admin/upload?key=${encodeURIComponent(img.key)}`, { method: "DELETE" }).catch(() => {});
    }
  }

  function move(index, dir) {
    const next = [...images];
    const target = index + dir;
    if (target < 0 || target >= next.length) return;
    [next[index], next[target]] = [next[target], next[index]];
    onChange(next);
  }

  function makeMain(index) {
    if (index === 0) return;
    const next = [...images];
    const [img] = next.splice(index, 1);
    next.unshift(img);
    onChange(next);
  }

  return (
    <div>
      <div
        className={`uploader ${drag ? "drag" : ""}`}
        onClick={() => inputRef.current?.click()}
        onDragOver={(e) => { e.preventDefault(); setDrag(true); }}
        onDragLeave={() => setDrag(false)}
        onDrop={(e) => { e.preventDefault(); setDrag(false); uploadFiles(e.dataTransfer.files); }}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => (e.key === "Enter" || e.key === " ") && inputRef.current?.click()}
      >
        <Icon name="upload" />
        <p><b>Click to upload</b> or drag &amp; drop</p>
        <small>JPG, PNG, WEBP, AVIF · max {MAX_MB} MB each · stored on Cloudflare R2</small>
        <input
          ref={inputRef}
          type="file"
          accept={ACCEPT}
          multiple
          hidden
          onChange={(e) => { uploadFiles(e.target.files); e.target.value = ""; }}
        />
      </div>

      {(images.length > 0 || uploading > 0) && (
        <div className="img-grid">
          {images.map((img, i) => (
            <div className="img-tile" key={img.key || img.url}>
              <img src={img.url} alt={img.alt || ""} />
              {i === 0 && <span className="main-flag">Main</span>}
              <div className="tools">
                <span style={{ display: "flex", gap: 4 }}>
                  <button type="button" onClick={() => move(i, -1)} title="Move left" disabled={i === 0}>‹</button>
                  <button type="button" onClick={() => move(i, 1)} title="Move right" disabled={i === images.length - 1}>›</button>
                  {i !== 0 && <button type="button" onClick={() => makeMain(i)} title="Set as main image">★</button>}
                </span>
                <button type="button" className="del" onClick={() => remove(i)} title="Remove image">✕</button>
              </div>
            </div>
          ))}
          {Array.from({ length: uploading }).map((_, i) => (
            <div className="img-tile uploading" key={`up-${i}`}><span className="spinner" /></div>
          ))}
        </div>
      )}
    </div>
  );
}
