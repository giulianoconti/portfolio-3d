import React, { useRef, useState } from "react";
import emailjs from "@emailjs/browser";

export const Contact = () => {
  const [submitState, setSubmitState] = useState("");
  const formRef = useRef();
  const nameRef = useRef();
  const emailRef = useRef();
  const messageRef = useRef();

  const clearForm = () => {
    nameRef.current.value = "";
    emailRef.current.value = "";
    messageRef.current.value = "";
  };

  const sendEmail = (e) => {
    e.preventDefault();
    setSubmitState("Enviando...");
    emailjs.sendForm(import.meta.env.VITE_SERVICE, import.meta.env.VITE_TEMPLATE, formRef.current, import.meta.env.VITE_PUBLICKEY).then(
      () => {
        setSubmitState("Enviado");
        clearForm();
      },
      (error) => {
        setSubmitState("Error");
        console.log(error.text);
      }
    );
  };
  return (
    <section id="contact">
      <form className="contact_form" onSubmit={sendEmail} ref={formRef}>
        <input className="form_input" name="name" type="text" placeholder="Nombre" required ref={nameRef} />
        <input className="form_input" name="email" type="email" placeholder="Email" required ref={emailRef} />
        <textarea className="form_textarea" name="message" placeholder="Mensaje" required ref={messageRef}></textarea>
        <div className="form_footer_container">
          {submitState === "Enviando..." && <p className="form_state_text">Enviando...</p>}
          <button
            className={`form_state_btn ${submitState === "Enviado" ? "show_state_btn_ok" : ""} ${submitState === "Error" ? "show_state_btn_error" : ""}`}
            onClick={() => setSubmitState("")}
            type="button"
            aria-label="Cerrar"
          >
            {submitState === "Enviado" && (
              <svg
                width="24px"
                height="24px"
                viewBox="0 0 36 36"
                xmlns="http://www.w3.org/2000/svg"
                xmlnsXlink="http://www.w3.org/1999/xlink"
                aria-hidden="true"
                role="img"
                className="iconify iconify--twemoji"
                preserveAspectRatio="xMidYMid meet"
              >
                <path fill="rgb(50, 200, 50)" d="M36 32a4 4 0 0 1-4 4H4a4 4 0 0 1-4-4V4a4 4 0 0 1 4-4h28a4 4 0 0 1 4 4v28z"></path>
                <path
                  fill="#FFF"
                  d="M29.28 6.362a2.502 2.502 0 0 0-3.458.736L14.936 23.877l-5.029-4.65a2.5 2.5 0 1 0-3.394 3.671l7.209 6.666c.48.445 1.09.665 1.696.665c.673 0 1.534-.282 2.099-1.139c.332-.506 12.5-19.27 12.5-19.27a2.5 2.5 0 0 0-.737-3.458z"
                ></path>
              </svg>
            )}
            {submitState === "Error" && (
              <svg
                fill="rgb(200, 50, 50)"
                height="24px"
                width="24px"
                version="1.1"
                id="Filled_Icons"
                xmlns="http://www.w3.org/2000/svg"
                xmlnsXlink="http://www.w3.org/1999/xlink"
                x="0px"
                y="0px"
                viewBox="0 0 24 24"
                enable-background="new 0 0 24 24"
                xml:space="preserve"
              >
                <g id="Status-Error-Filled">
                  <path
                    d="M12,0C5.37,0,0,5.37,0,12s5.37,12,12,12s12-5.37,12-12S18.63,0,12,0z M18.38,16.62l-1.77,1.77L12,13.77l-4.62,4.62
                 l-1.77-1.77L10.23,12L5.62,7.38l1.77-1.77L12,10.23l4.62-4.62l1.77,1.77L13.77,12L18.38,16.62z"
                  />
                </g>
              </svg>
            )}
            <p>{submitState}</p>
            <svg width="24px" height="24px" viewBox="0 0 24 24" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink">
              <g id="Page-1" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
                <g id="ic-cross" fill="#4A4A4A">
                  <path
                    d="M12,10.4834761 L7.83557664,6.31871006 C7.41207382,5.89517239 6.73224519,5.89425872 6.31350312,6.31303524 C5.89184166,6.7347314 5.89730155,7.41332336 6.31917747,7.83523399 L10.4836008,12 L6.31917747,16.164766 C5.89730155,16.5866766 5.89184166,17.2652686 6.31350312,17.6869648 C6.73224519,18.1057413 7.41207382,18.1048276 7.83557664,17.6812899 L12,13.5165239 L16.1644234,17.6812899 C16.5879262,18.1048276 17.2677548,18.1057413 17.6864969,17.6869648 C18.1081583,17.2652686 18.1026985,16.5866766 17.6808225,16.164766 L13.5163992,12 L17.6808225,7.83523399 C18.1026985,7.41332336 18.1081583,6.7347314 17.6864969,6.31303524 C17.2677548,5.89425872 16.5879262,5.89517239 16.1644234,6.31871006 L12,10.4834761 L12,10.4834761 Z"
                    id="Combined-Shape"
                  ></path>
                </g>
              </g>
            </svg>
          </button>
          <button className="form_btn" type="submit">
            Enviar
          </button>
        </div>
      </form>
    </section>
  );
};
