import successImage from "../../images/success-icon.svg";
import deniedImage from "../../images/fail-icon.svg";
import { useStore } from "../../services/StoreProvider.js";

const InfoToolTip = () => {
  const [state] = useStore();
  const { success, message } = state.toolTip;

  return (
    <>
      <img
        className="modal__icon"
        src={success ? successImage : deniedImage}
        alt="Картинка статуса модального окна"
      />
      <h3 className="modal__title">{message}</h3>
    </>
  );
}

export default InfoToolTip;
