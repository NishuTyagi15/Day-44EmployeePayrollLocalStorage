window.addEventListener('DOMContentLoaded', (event) => {
    const name = document.querySelector('#name');
    const textError = document.querySelector('.text-error');
    name.addEventListener('input', function() {
        if (name.value.length == 0) {
            textError.textContent = "";
            return;
        }
        try {
            (new EmployeePayrollData()).name = name.value;
            textError.textContent = "";
        } catch (e) {
            textError.textContent = e;
        }
    });

    const salary = document.querySelector('#salary');
    const output = document.querySelector('.salary-output');
    output.textContent = salary.value;
    salary.addEventListener('input', function() {
        output.textContent = salary.value;
    });

    const save = () => {
        try {
            let employeePayrollData = createEmployeePayroll();
            createAndUpdateStorage(employeePayrollData);
        } catch (error) {
            console.log(error);
            return;
        }
    }
    
    const resetForm = () => {
        setValue("#name", "");
        unsetSelectedValues("[name=profile]");
        unsetSelectedValues("[name=gender]");
        unsetSelectedValues("[name=department]");
        setValue("#salary", "");
        setValue("#notes", "");
        setValue("#day", "1");
        setValue("#month", "Jan");
        setValue("#year", "2021");
        setTextValue(".salary-output", "400000");
    }
    
    const unsetSelectedValues = (propertyValue) => {
        let allItems = document.querySelectorAll(propertyValue);
        allItems.forEach((item) => {
            item.checked = false;
        });
    };
    
    const setTextValue = (id, value) => {
        //not used anywhere!
        const element = document.querySelector(id);
        element.value = value;
    };
    
    const setValue = (id, value) => {
        const element = document.querySelector(id);
        element.value = value;
    };

    const createEmployeePayroll = () => {
        let employeePayroll = new EmployeePayrollData();
        try {
            employeePayroll.name = getInputValueById("#name");
        } catch (e) {
            setTextValue(".text-error", e);
            throw e;
        }
        employeePayroll.profilePic = getSelectedValues("[name=profile]").pop();
        employeePayroll.gender = getSelectedValues("[name=gender]").pop();
        employeePayroll.department = getSelectedValues("[name=department]");
        employeePayroll.salary = getInputValueById("#salary");
        employeePayroll.note = getInputValueById("#notes");
        let date =
            getInputValueById("#day") +
            "-" +
            getInputValueById("#month") +
            "-" +
            getInputValueById("#year");
        employeePayroll.startDate = new Date(date);
        alert(employeePayroll.toString());
        return employeePayroll;
    }
    
    function createAndUpdateStorage(employeePayrollData) {
        let employeePayrollList = JSON.parse(
            localStorage.getItem("employeePayrollList")
        );
        if (employeePayrollList != undefined) {
            employeePayrollList.push(employeePayrollData);
        } else {
            employeePayrollList = [employeePayrollData];
        }
        alert(employeePayrollList.toString());
        localStorage.setItem ("employeePayrollList", JSON.stringify(employeePayrollList)
        );
    }
    
    /**
     * gets the values of all the selected elements
     */
    const getSelectedValues = (propertyValue) => {
        let allItems = document.querySelectorAll(propertyValue);
        let selItems = [];
        allItems.forEach((item) => {
            if (item.checked) selItems.push(item.value);
        });
        return selItems;
    };
    
    /**
     * querySelector is the newer feature.
     * Can be used when selecting by element name, nesting or class-name.
     * It lets you find elements with rules that can't be expressed with getElementById.
     */
    const getInputValueById = (id) => {
        let value = document.querySelector(id).value;
        return value;
    };
    
    /**
    * getElementById is better supported than qurySelector method in older versions of the browsers.
    * It only allows to select element by only its id.
    */
    const getInputElementValue = (id) => {
        let value = document.getElementById(id).value;
        return value;
    };
});