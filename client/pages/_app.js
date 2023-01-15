import "../styles/globals.css";
import "semantic-ui-css/semantic.min.css";
import { store } from "../redux/Store/Store";
import { Provider } from "react-redux";

export default function App({ Component, pageProps }) {
  return (
    <Provider store={store}>
      <Component {...pageProps} />
    </Provider>
  );
}
