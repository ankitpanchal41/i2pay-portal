import React, { useEffect, useRef, forwardRef } from "react";
import { useDispatch } from "react-redux";
import ReCAPTCHA from "react-google-recaptcha";
import { VERIFY_TOKEN_START } from "../../redux/types/Auth";
import { verifyTokenStart } from "../../redux/actions/AuthAction";

const ReCaptchaComponent = (props, ref) => {
    const toggleCaptchaBadge = (show) => {
        const badge = document.getElementsByClassName('grecaptcha-badge')[0];
        if (badge && badge instanceof HTMLElement) {
          badge.style.visibility = show ? 'visible' : 'hidden';
          badge.style.cssText = 'width: 256px; height: 60px; display: block; transition: right 0.3s ease 0s; position: fixed; bottom: 14px; right: -186px; box-shadow: gray 0px 0px 5px; border-radius: 2px; overflow: hidden;';
        }
      };

      useEffect(() => {
        toggleCaptchaBadge(true);
        return () => toggleCaptchaBadge(false);
      }, []);

    return (
        <div className="mt-4">
            <ReCAPTCHA
            ref={ref} 
            sitekey={process.env.REACT_APP_CAPTCHA_SITE_KEY} 
            size="invisible"
            asyncScriptOnLoad={props.asyncScriptOnLoad}
            />
        </div>
    );
};

export default forwardRef(ReCaptchaComponent);
