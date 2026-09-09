"use client";

import { useRef, useState } from "react";
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogTitle } from "@/components/ui/dialog";
import { LineArrow } from "./line-arrow";

export function CVViewer() {
  const [open, setOpen] = useState(false);
  const trigger = useRef<HTMLButtonElement>(null);

  return (
    <>
      <button ref={trigger} type="button" className="cv-open" onClick={() => setOpen(true)}>
        CV <LineArrow />
      </button>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent
          className="project-dialog cv-dialog"
          dir="ltr"
          showCloseButton={false}
          onCloseAutoFocus={(event) => {
            event.preventDefault();
            trigger.current?.focus({ preventScroll: true });
          }}
        >
          <DialogClose className="detail-close">Close ×</DialogClose>
          <header className="cv-dialog-header">
            <p className="detail-eyebrow">CURRICULUM VITAE / WEB VIEW</p>
            <DialogTitle>Amir Shamani</DialogTitle>
            <DialogDescription>Professional experience, education, publications, exhibitions, awards and technical skills.</DialogDescription>
          </header>
          <figure className="cv-sheet">
            <img src="/Amir-Shamani-CV-Web.webp" alt="Amir Shamani curriculum vitae" width="1680" height="1260" />
          </figure>
        </DialogContent>
      </Dialog>
    </>
  );
}
