import successImg from '../images/success.svg';
import rejectImg from '../images/reject.svg';

function InfoTooltip({ isOpen, onClose, isRegistered }) {
  return (
    <div className={`popup popup_type_registration ${isOpen && "popup_opened"}`} >
      <div className="popup__content dialog-window">
        <button className="button button_type_close" aria-label="Закрыть" type="button" onClick={onClose}></button>
        <img className="popup__registration-image" src={isRegistered ? successImg : rejectImg} alt={isRegistered ? 'Удачно' : 'Ошибка'} />
        <h2 className="popup__title popup__title_tip">
          {isRegistered ? 'Вы успешно зарегистрировались!' : 'Что-то пошло не так! Попробуйте ещё раз.'}
        </h2>
      </div>
    </div>
  );
}

export default InfoTooltip;
