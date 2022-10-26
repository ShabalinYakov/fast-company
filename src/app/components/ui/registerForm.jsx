import TextField from "../../components/common/form/textField";
import SelectField from "../common/form/selectField";
import MultiSelect from "../common/form/multiSelect";
import React, { useEffect, useState } from "react";
import RadioField from "../common/form/radioField";
import { validator } from "../../utils/validator";
import api from "../../api";
import CheckBoxField from "../common/form/checkBoxField";

const RegisterForm = () => {
    const [data, setData] = useState({
        email: "",
        password: "",
        profession: "",
        sex: "male",
        qualities: [],
        licence: false
    });
    const [qualities, setQualities] = useState([]);
    const [professions, setProfession] = useState();
    const [errors, setErrors] = useState({});

    useEffect(() => {
        api.professions.fetchAll().then((data) => {
            const professionsList = Object.keys(data).map((professionName) => ({
                label: data[professionName].name,
                value: data[professionName]._id
            }));
            setProfession(professionsList);
        });
        api.qualities.fetchAll().then((data) => {
            const qualitiesList = Object.keys(data).map((optionName) => ({
                label: data[optionName].name,
                value: data[optionName]._id,
                color: data[optionName].color
            }));
            setQualities(qualitiesList);
        });
    }, []);

    const validatorConfig = {
        email: {
            isRequired: { message: "Email обязателен для заполнения" },
            isEmail: { message: "Email введен некорректно" }
        },
        password: {
            isRequired: { message: "Пароль обязателен для заполнения" },
            isCapitalSymbol: {
                message: "Пароль должен содержать хотя бы одину заглавную букву"
            },
            isContainDigit: {
                message: "Пароль должен содержать хотя бы один число"
            },
            min: {
                message: "Пароль должен состоять минимум из 8 символов",
                value: 8
            }
        },
        profession: {
            isRequired: {
                message: "Обязательно выберите Вашу профессию"
            }
        },
        licence: {
            isRequired: {
                message:
                    "Вы не можете использовать наш сервис без подтверждения лицензионного соглашения"
            }
        }
    };

    useEffect(() => {
        validate();
    }, [data]);

    const validate = () => {
        const errors = validator(data, validatorConfig);
        setErrors(errors);
        return Object.keys(errors).length === 0;
    };

    const isValide = Object.keys(errors).length === 0;

    const getProfessionById = (id) => {
        for (const prof of professions) {
            if (prof.value === id) {
                return { _id: prof.value, name: prof.label };
            }
        }
    };
    const getQualities = (elements) => {
        const qualitiesArray = [];
        for (const elem of elements) {
            for (const quality in qualities) {
                if (elem.value === qualities[quality].value) {
                    qualitiesArray.push({
                        _id: qualities[quality].value,
                        name: qualities[quality].label,
                        color: qualities[quality].color
                    });
                }
            }
        }
        return qualitiesArray;
    };

    const handleChange = (target) => {
        setData((prevState) => ({ ...prevState, [target.name]: target.value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const isValid = validate();
        if (!isValid) return;
        const { profession, qualities } = data;
        console.log({
            ...data,
            profession: getProfessionById(profession),
            qualities: getQualities(qualities)
        });
    };
    return (
        <form onSubmit={handleSubmit}>
            <TextField
                label="Email"
                name="email"
                value={data.email}
                onChange={handleChange}
                error={errors.email}
            />
            <TextField
                label="Password"
                type="password"
                name="password"
                value={data.password}
                onChange={handleChange}
                error={errors.password}
            />
            <SelectField
                label="Выберите Вашу профессию"
                value={data.profession}
                name="profession"
                onChange={handleChange}
                defaultOption="Choose..."
                options={professions}
                error={errors.profession}
            />
            <RadioField
                options={[
                    { name: "Male", value: "male" },
                    { name: "Female", value: "female" },
                    { name: "Other", value: "other" }
                ]}
                name="sex"
                onChange={handleChange}
                value={data.sex}
                label="Выберите Ваш пол"
            />
            <MultiSelect
                options={qualities}
                onChange={handleChange}
                defaultValue={data.qualities}
                name="qualities"
                label="Выберите Ваши качества"
            />
            <CheckBoxField
                name="licence"
                value={data.licence}
                onChange={handleChange}
                error={errors.licence}
            >
                Подтвердить <a>лизензионное соглашение</a>
            </CheckBoxField>
            <button
                className="btn btn-primary w-100 mx-auto"
                disabled={!isValide}
                type="submit"
            >
                Submit
            </button>
        </form>
    );
};

export default RegisterForm;
