import { AfterViewInit, Component, ViewEncapsulation } from "@angular/core";
import { pdfExporter } from "quill-to-pdf";
import { saveAs } from "file-saver";

declare let Quill; // declare Quill to make TypeScript happy :)

@Component({
  selector: "my-app",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"],
  encapsulation: ViewEncapsulation.None
})
export class AppComponent implements AfterViewInit {
  // we use this property to store the quill instance
  private quillInstance: any;

  // ** MOST IMPORTANT PART OF THE DEMO HERE **
  // this function is triggered by a click on the download button
  // note that it is an ASYNC function
  async exportPdf() {
    // we retrieve the delta object from the Quill instance
    // the delta is the raw content of your Quill editor
    const delta = this.quillInstance.getContents();

    // we pass the delta object to the generatePdf function of the pdfExporter
    // be sure to AWAIT the result, because it returns a Promise
    // it will resolve to a Blob of the PDF document
    const blob = await pdfExporter.generatePdf(delta);

    // we use saveAs from the file-saver package to download the blob
    saveAs(blob as Blob, "pdf-export.pdf");
  }

  // starts a quill editor and gives access to the Quill instance
  setUpQuill() {
    this.quillInstance = new Quill("#editor", {
      theme: "snow",
      modules: {
        toolbar: [
          [{ header: [1, 2, false] }],
          ["bold", "italic", "strike", "underline"],
          ["code-block", "blockquote"],
          [{ size: ["normal", "small", "large", "huge"] }],
          ["image", "video", "link", "formula"],
          [{ list: "bullet" }, { list: "ordered" }]
        ]
      }
    });
  }

  ngAfterViewInit() {
    // this simply makes sure that quill is available when the editor is instantiated
    setTimeout(() => this.setUpQuill(), 1500);
  }
}
