import React from "react";

const Footer = () => {
    return (
        <footer className="flex items-center justify-center py-4 border-t-2 border-slate-200/40">
            <p>
                Made with ♥️ by{" "}
                <a
                    className="font-semibold decoration-2 underline underline-offset-4 decoration-indigo-500/50 font-serif"
                    href="https://github.com/exkuretrol"
                    target="_blank"
                    rel="noreferrer"
                >
                    Kuaz
                </a>
            </p>
        </footer>
    );
};

export default Footer;
