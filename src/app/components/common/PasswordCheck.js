const PasswordCheck = ({ strength, result }) => {
    return (
        <div className="progress mt-3" style={{ border: "1px hidden", borderColor: "rgb(180, 180, 180)", height: "14px" }}>
            <div
                id="progressBar"
                className="progress-bar progress-bar-striped progress-bar-animated active"
                style={{
                    width: strength[result].percentage,
                    backgroundColor: strength[result].style,
                    borderColor: "rgb(160, 160, 160)",
                }}>
                <div>{strength[result].text}</div>
            </div>
        </div>
    );
};

export default PasswordCheck;
