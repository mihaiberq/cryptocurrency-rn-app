export const holdings = [
  {
    id: "bitcoin",
    qty: 888,
  },
  {
    id: "ethereum",
    qty: 188,
  },
  {
    id: "dogecoin",
    qty: 88888,
  },
];

export const profile = {
  id: 8888888,
  email: "test@test.com",
};

const EmptyFunction = () => console.log("Pressed");

export const settings = [
  {
    prefType: "header",
    title: "APP",
  },
  {
    prefType: "preference",
    title: "Launch Screen",
    value: "Home",
    type: "button",
    onPress: EmptyFunction,
  },
  {
    prefType: "preference",
    title: "Appearence",
    value: "Dark",
    type: "button",
    onPress: EmptyFunction,
  },
  {
    prefType: "header",
    title: "ACCOUNT",
  },
  {
    prefType: "preference",
    title: "Fiat Currency",
    value: "USD",
    type: "button",
    onPress: EmptyFunction,
  },
  {
    prefType: "preference",
    title: "Language",
    value: "English",
    type: "button",
    onPress: EmptyFunction,
  },
  {
    prefType: "header",
    title: "SECURITY",
  },
  {
    prefType: "preference",
    title: "FaceID",
    value: "",
    onPress: EmptyFunction,
    type: "switch",
  },
  {
    prefType: "preference",
    title: "Password",
    value: "",
    type: "button",
    onPress: EmptyFunction,
  },
  {
    prefType: "preference",
    title: "Change Password",
    value: "",
    type: "button",
    onPress: EmptyFunction,
  },
  {
    prefType: "preference",
    title: "2-Factor Authentication",
    value: "",
    type: "button",
    onPress: EmptyFunction,
  },
];

const dummyData = {
  holdings,
  profile,
  settings,
};

export default dummyData;
