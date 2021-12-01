import React, { useEffect, useState } from "react";
import dropin from "braintree-web-drop-in";

export default function BraintreeDropIn(props) {
  const { show, onPaymentCompleted } = props;

  const [braintreeInstance, setBraintreeInstance] = useState(undefined);

  useEffect(() => {
    if (show) {
      const initializeBraintree = () =>
        dropin.create(
          {
            authorization: "sandbox_s9gd7m2p_vp62s592633kc5p5",
            container: "#braintree-drop-in-div",
          },
          function (error, instance) {
            if (error) console.error(error);
            else setBraintreeInstance(instance);
          }
        );

      if (braintreeInstance) {
        braintreeInstance.teardown().then(() => {
          initializeBraintree();
        });
      } else {
        initializeBraintree();
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [show]);

  return (
    <div style={{ display: `${show ? "block" : "none"}` }}>
      <div id={"braintree-drop-in-div"} />

      <button
        className={"btn btn-danger mt-2 mb-2 ml-2 mr-2"}
        style={{ letterSpacing: "2px" }}
        type="primary"
        disabled={!braintreeInstance}
        onClick={() => {
          if (braintreeInstance) {
            braintreeInstance.requestPaymentMethod((error, payload) => {
              if (error) {
                console.error(error);
              } else {
                const paymentMethodNonce = payload.nonce;
                // console.log("payment method nonce", payload.nonce);
                console.log("payment method nonce", paymentMethodNonce);

                // alert(`Payment completed with nonce=${paymentMethodNonce}`);
                alert(`Payment complete`);

                onPaymentCompleted();
              }
            });
          }
        }}
      >
        {"Pay"}
      </button>
    </div>
  );
}
