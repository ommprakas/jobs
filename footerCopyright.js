import React from "react";
import { Link } from "react-router-dom";
import { N_LOGO } from "./logo";
import { useTranslation } from "react-i18next";
export const FooterCopyright = () => {
  const { t } = useTranslation();
  return (
    <div className="footerCopyrightWrapper">
      <img className="footerLogo" src={N_LOGO} />
      <p className="privacyPolicyDesc">{t("footer.copyright")}</p>
      <div className="privacyPolicyLinkWrapper">
        <Link to="/" className="privacyPolicyLink">
          Privacy
        </Link>
        <Link to="/" className="privacyPolicyLink">
          Support
        </Link>
      </div>
    </div>
  );
};
