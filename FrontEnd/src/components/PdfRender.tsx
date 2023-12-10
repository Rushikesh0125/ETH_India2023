import React from "react";

const PdfRender = () => {
  return (
    <div className="py-8 px-4">
      <h1 className="text-5xl pb-[10px] font-exo">SHOWCASE</h1>

      <div
        className="p-10 md:p-20 lg:p-40"
        style={{
          position: "relative",
          width: "100%",
          height: 0,
          paddingTop: "40.0000%",
          paddingBottom: 0,
          boxShadow: "0 2px 8px 0 rgba(63,69,81,0.16)",
          marginTop: "1.6em",
          marginBottom: "0.9em",
          overflow: "hidden",
          borderRadius: "8px",
          willChange: "transform",
        }}
      >
        <iframe
          loading="lazy"
          style={{
            position: "absolute",
            width: "100%",
            height: "100%",
            top: 0,
            left: 0,
            border: "none",
            padding: 0,
            margin: 0,
          }}
          src="https://www.canva.com/design/DAF2fLUKsXc/watch?embed"
          allowFullScreen={true}
          allow="fullscreen"
        ></iframe>
      </div>
      <a
        href="https://www.canva.com/design/DAF2fLUKsXc/watch?utm_content=DAF2fLUKsXc&utm_campaign=designshare&utm_medium=embeds&utm_source=link"
        target="_blank"
        rel="noopener"
      >
        EthIndia 2023
      </a>
    </div>
  );
};

export default PdfRender;
