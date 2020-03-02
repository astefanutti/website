// Much appreciated to: https://codepen.io/aaroniker/pen/KGpXZo
export default () => `

.dayNight input {
  display: none;
}

label.dayNight {
  cursor: pointer;
}

label.dayNight > div {
  transform: scale(0.35) !important;
}

.dayNight input + div {
  border-radius: 50%;
  width: 36px;
  height: 36px;
  position: relative;
  box-shadow: inset 16px -16px 0 0 #111;
  transform: scale(1) rotate(-2deg);
  transition: box-shadow 0.5s ease 0s, transform 0.4s ease 0.1s;
}

.dayNight input + div:before {
  content: '';
  width: inherit;
  height: inherit;
  border-radius: inherit;
  position: absolute;
  left: 0;
  top: 0;
  transition: background 0.3s ease;
}

.dayNight input + div:after {
  content: '';
  width: 8px;
  height: 8px;
  border-radius: 50%;
  margin: -4px 0 0 -4px;
  position: absolute;
  top: 50%;
  left: 50%;
  box-shadow: 0 -23px 0 #ddd, 0 23px 0 #ddd, 23px 0 0 #ddd, -23px 0 0 #ddd, 15px 15px 0 #ddd, -15px 15px 0 #ddd, 15px -15px 0 #ddd, -15px -15px 0 #ddd;
  transform: scale(0);
  transition: all 0.3s ease;
}

.dayNight input:checked + div {
  box-shadow: inset 32px -32px 0 0 #111;
  transform: scale(0.5) rotate(0deg);
  transition: transform 0.3s ease 0.1s, box-shadow 0.2s ease 0s;
}

.dayNight input:checked + div:before {
  background: #ddd;
  transition: background 0.3s ease 0.1s;
}

.dayNight input:checked + div:after {
  transform: scale(1.5);
  transition: transform 0.5s ease 0.15s;
}

`
