import React from "react";
import { Position, Toaster, Intent } from "@blueprintjs/core";
import { FormattedMessage, IntlProvider } from "react-intl";
import flattenMessages from "../localization/flattenMessages";

const DefaultToast = Toaster.create({
  className: "toaster",
  position: Position.TOP_RIGHT,
});

const Message = (message, values = {}) => (
  <IntlProvider
    locale={window.CURRENT_LANGUAGE}
    messages={flattenMessages(window.CURRENT_LANGUAGE)}
  >
    <FormattedMessage id={message} values={values} defaultMessage={message} />
  </IntlProvider>
);

const showToast = (message, values = {}, isSuccess) => {
  DefaultToast.show({
    intent: isSuccess ? Intent.SUCCESS : Intent.DANGER,
    message: Message(message, values),
    timeout: 5000,
  });
};

export default showToast;
