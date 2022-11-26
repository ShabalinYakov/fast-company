import MultiSelectField from "../../common/form/multiSelectField";
import { useProfessions } from "../../../hooks/useProfession";
import SelectField from "../../common/form/selectField";
import BackHistoryButton from "../../common/backButton";
import RadioField from "../../common/form/radioField";
import { validator } from "../../../utils/validator";
import TextField from "../../common/form/textField";
import React, { useEffect, useState } from "react";
import { useAuth } from "../../../hooks/useAuth";
import { useHistory } from "react-router-dom";
import { useSelector } from "react-redux";
import {
    getQualities,
    getQualitiesLoadingStatus
} from "../../../store/qualities";

const EditUserPage = () => {
    const history = useHistory();
    const [data, setData] = useState();
    const [errors, setErrors] = useState({});
    const [isLoading, setLoading] = useState(true);
    const { currentUser, updateUserProfile } = useAuth();
    const qualities = useSelector(getQualities());
    const qualityLoading = useSelector(getQualitiesLoadingStatus());
    const { professions, isLoading: profLoading } = useProfessions();

    const listOfQualities = qualities.map((quality) => ({
        label: quality.name,
        value: quality._id
    }));

    const listOfProfessions = professions.map((profession) => ({
        label: profession.name,
        value: profession._id
    }));

    const handleSubmit = async (e) => {
        e.preventDefault();
        const isValid = validate();
        if (!isValid) return;
        await updateUserProfile({
            ...data,
            qualities: data.qualities.map((quality) => quality.value)
        });

        history.push(`/users/${currentUser._id}`);
    };

    function getQualitiesId(listId) {
        const qualitiesArray = [];
        for (const qualityId of listId) {
            for (const quality of qualities) {
                if (quality._id === qualityId) {
                    qualitiesArray.push(quality);
                    break;
                }
            }
        }
        return qualitiesArray;
    }

    const transformData = (data) => {
        return getQualitiesId(data).map((qual) => ({
            label: qual.name,
            value: qual._id
        }));
    };

    useEffect(() => {
        if (!profLoading && !qualityLoading && currentUser && !data) {
            setData({
                ...currentUser,
                qualities: transformData(currentUser.qualities)
            });
        }
    }, [profLoading, qualityLoading, currentUser, data]);
    useEffect(() => {
        if (data && isLoading) {
            setLoading(false);
        }
    }, [data]);

    const validatorConfig = {
        email: {
            isRequired: {
                message: "Электронная почта обязательна для заполнения"
            },
            isEmail: {
                message: "Email введен некорректно"
            }
        },
        name: {
            isRequired: {
                message: "Введите ваше имя"
            }
        }
    };
    useEffect(() => {
        validate();
    }, [data]);
    const handleChange = (target) => {
        setData((prevState) => ({
            ...prevState,
            [target.name]: target.value
        }));
    };
    const validate = () => {
        const errors = validator(data, validatorConfig);
        setErrors(errors);
        return Object.keys(errors).length === 0;
    };
    const isValid = Object.keys(errors).length === 0;
    return (
        <div className="container mt-5">
            <BackHistoryButton />
            <div className="row">
                <div className="col-md-6 offset-md-3 shadow p-4">
                    {!isLoading && Object.keys(professions).length > 0 ? (
                        <form onSubmit={handleSubmit}>
                            <TextField
                                label="Имя"
                                name="name"
                                value={data.name}
                                onChange={handleChange}
                                error={errors.name}
                            />
                            <TextField
                                label="Электронная почта"
                                name="email"
                                value={data.email}
                                onChange={handleChange}
                                error={errors.email}
                            />
                            <SelectField
                                label="Выбери свою профессию"
                                defaultOption="Choose..."
                                options={listOfProfessions}
                                name="profession"
                                onChange={handleChange}
                                value={data.profession}
                                error={errors.profession}
                            />
                            <RadioField
                                options={[
                                    { name: "Male", value: "male" },
                                    { name: "Female", value: "female" },
                                    { name: "Other", value: "other" }
                                ]}
                                value={data.sex}
                                name="sex"
                                onChange={handleChange}
                                label="Выберите ваш пол"
                            />
                            <MultiSelectField
                                defaultValue={data.qualities}
                                options={listOfQualities}
                                onChange={handleChange}
                                name="qualities"
                                label="Выберите ваши качества"
                            />
                            <button
                                type="submit"
                                disabled={!isValid}
                                className="btn btn-primary w-100 mx-auto"
                            >
                                Обновить
                            </button>
                        </form>
                    ) : (
                        "Loading..."
                    )}
                </div>
            </div>
        </div>
    );
};

export default EditUserPage;
