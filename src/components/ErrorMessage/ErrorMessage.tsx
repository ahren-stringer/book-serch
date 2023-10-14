
interface IErrorMessage{
  errorMessage: string
}
const ErrorMessage: React.FC<IErrorMessage> = ({ errorMessage}) => {

  return (
    <div >
      {errorMessage}
    </div>
  );
}

export default ErrorMessage;
