window.onload = init();


function init() {
    var form = document.getElementById('form');
    var pointACoord = document.getElementById("pointA");
    var pointBCoord = document.getElementById("pointB");

    console.log(pointACoord, pointBCoord);

    form.addEventListener('submit', (event) => {
        event.preventDefault();

        validateInputs();
    });

    const setError = (element, message) => {
        console.log(";kjhas;kdhga;l");
        const inputControl = element.parentElement;
        const errorDisplay = inputControl.querySelector('.error');

        errorDisplay.innerText = message;
        inputControl.classList.add('error');
        inputControl.classList.remove('success');
    };

    const setSuccess = element => {
        
        const inputControl = element.parentElement;
        const errorDisplay = inputControl.querySelector('.error');
        errorDisplay.innerText = '';
        inputControl.classList.add('success');
        inputControl.classList.remove('error');
    }

    const validateInputs = () => {
        console.log("bruh");
        const pointAValue = pointACoord.value;
        const pointBValue = pointACoord.value;

        console.log(pointAValue, pointBValue);

        if (pointAValue === '') {
            setError(pointACoord, 'Coordinate required!');
        } else if (!isValidCoordinate(pointAValue)) {
            setError(pointACoord, 'Provide a valid coordinate');
        }
        else {
            setSuccess(pointACoord)
        }

        if (pointBValue === '') {
            setError(pointBCoord, 'Coordinate required!');
        } else if (!isValidCoordinate(pointBValue)) {
            setError(pointBCoord, 'Provide a valid coordinate');
        } else {
            setSuccess(pointBCoord)
        }
    };

    const isValidCoordinate = coord => {
        /* use regex to get valid points */
        return false;
    }

}

