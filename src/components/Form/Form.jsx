import React from "react";
import { useCallback } from "react";
import { useTelegram } from "../../hooks/useTelegram";
import "./Form.css";

const Form = () => {
  const [country, setCountry] = React.useState("РФ");
  const [city, setCity] = React.useState("Балашиха");
  const [street, setStreet] = React.useState("Демин луг");
  const [subject, setSubject] = React.useState("physical");

  const { tg } = useTelegram();

  const onSendData = useCallback(() => {
    const data = {
      country,
      city,
      street,
      subject,
    };
    tg.sendData(JSON.stringify(data));
    // eslint-disable-next-line
  }, [country, city, street, subject]);

  React.useEffect(() => {
    tg.onEvent("mainButtonClicked", onSendData);
    return () => {
      tg.offEvent("mainButtonClicked", onSendData);
    };
    // eslint-disable-next-line
  }, []);

  React.useEffect(() => {
    tg.MainButton.setParams({ text: "Отправить данные" });
    // eslint-disable-next-line
  }, []);

  React.useEffect(() => {
    if (!street || !country) {
      tg.MainButton.hide();
    } else {
      tg.MainButton.show();
    }
    // eslint-disable-next-line
  }, [country, street]);

  const onChangeCountry = (e) => {
    setCountry(e.target.value);
  };
  const onChangeCity = (e) => {
    setCity(e.target.value);
  };
  const onChangeStreet = (e) => {
    setStreet(e.target.value);
  };

  const onChangeSubject = (e) => {
    setSubject(e.target.value);
  };

  return (
    <div className={"form"}>
      <h3>Введите ваши данные</h3>
      <input
        className={"input"}
        type="text"
        placeholder={"Страна"}
        value={country}
        onChange={onChangeCountry}
      />
      <input
        className={"input"}
        type="text"
        placeholder={"Город"}
        value={city}
        onChange={onChangeCity}
      />
      <input
        className={"input"}
        type="text"
        placeholder={"Улица"}
        value={street}
        onChange={onChangeStreet}
      />

      <select className={"select"} value={subject} onChange={onChangeSubject}>
        <option value={"physical"}>Физ. лицо</option>
        <option value={"legend"}>Юр. лицо</option>
      </select>
    </div>
  );
};

export default Form;
