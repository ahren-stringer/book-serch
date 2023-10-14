import { ReactNode } from "react";

interface ICenteredMessage {
    children: ReactNode;
  }
function CenteredMessage({children}:ICenteredMessage) {

    return (
        <div className="message--centerd">
            {children}
        </div>
    );
}

export default CenteredMessage;
