import { useCallback, useEffect } from "react";
import successIcon from "../../images/success-icon.svg";
import failIcon from "../../images/fail-icon.svg";
import { useStore } from "../../services/StoreProvider.js";
import { CLOSE_TOOL_TIP } from "../../services/actions/toolTip.js";

const InfoToolTip = () => {
  const [state, dispatch] = useStore();

  const { toolTip } = state;

  const onClose = useCallback(() => {
    dispatch({ type: CLOSE_TOOL_TIP });
  }, [dispatch]);

  const handleCloseByEsc = useCallback(
    (e) => {
      if (e.code === "Escape") {
        onClose();
      }
    },
    [onClose]
  );

  useEffect(() => {
    document.addEventListener("keydown", handleCloseByEsc);
    return () => {
      document.removeEventListener("keydown", handleCloseByEsc);
    };
  }, [handleCloseByEsc]);

  const { success, message, isOpen } = toolTip;

  return (
    <div className={`popup ${isOpen && "popup_opened"}`} onClick={onClose}>
      <div className="popup__container">
        <button
          onClick={onClose}
          aria-label="Закрыть"
          type="button"
          className="popup__close"
        ></button>
        <img
          className="popup__icon"
          src={success ? successIcon : failIcon}
          alt="Иконка поп апа"
        />
        <h3 className="popup__title">
          {message}
        </h3>
      </div>
    </div>
  );
};

export default InfoToolTip;
