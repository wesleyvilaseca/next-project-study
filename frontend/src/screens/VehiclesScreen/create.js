import Head from 'next/head';
import React, { useEffect } from 'react';
import Header from '../../layout/Header'
import { useRouter } from 'next/router'
import { changeLoading } from "../../store/actions/loading.action";
import { useSelector, useDispatch } from 'react-redux';
import { store, show, change, get_cep, brand, model, version } from '../../store/actions/vehicles.action';
import MaskedInput from 'react-text-mask';
import { TextField, InputAdornment, CircularProgress, Select, MenuItem } from '@mui/material';
import { NumericFormat } from 'react-number-format';

const TextMaskCustom = (props) => {
    const { inputRef, ...other } = props;
    const mask = [/[0-9]/, /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/];

    return (
        <MaskedInput
            {...other}
            ref={inputRef}
            mask={mask}
            guide={false}
        />
    )
}

const NumberFormatCustom = (props) => {
    const { inputRef, onChange, ...other } = props;
    return (
        <NumericFormat
            {...other}
            decimalSeparator=","
            thousandSeparator="."
            prefix={other.name}
            onChangeValue={values => {
                onChange({
                    target: {
                        value: values.value
                    }
                })
            }}
        />
    )
}

export default function VehicleCreateScreen() {
    const router = useRouter();
    const dispatch = useDispatch();
    const data = useSelector(state => state.vehicleReducer);

    const [state, setState] = React.useState({
        isLoading: true,
        isLoadingCep: false,
        isDeleted: null,
        redirect: false,
        tips: 0,
        confirmEl: null,
        vehicle_id: null
    });

    if (state.isLoading) dispatch(changeLoading({ open: true }))

    useEffect(() => {
        if (!router.isReady) return;
        const id = router.query.id
        if (id) setState({ vehicle_id: id })

        index()

    }, [router.isReady])

    const index = () => {
        if (state.vehicle_id) {
            dispatch(show(state.vehicle_id))
                .then(res => {
                    setState({ isLoading: false })
                    dispatch(changeLoading({ open: false }))
                })
                .catch(error => {
                    console.log(error)
                    dispatch(changeLoading({ open: false }))
                })
        } else {
            dispatch(store())
                .then(res => {
                    setState({ isLoading: false })
                    dispatch(changeLoading({ open: false }))

                })
                .catch(error => {
                    console.log(error)
                    dispatch(changeLoading({ open: false }))
                })
        }
    }

    return (
        <React.Fragment>
            <Head>
                <title>Veiculos - Site CRM</title>
                <meta name="description" content="Generated by create next app" />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <Header title="Veículos gestão" />

            <div className='container mt-4 pt-3'>

                {(!state.isLoading) && (
                    <div className='row'>
                        <div className='col-md-7'>
                            <h3 className='font-weight-normal mb-4'> Localização do Veículo</h3>
                            <div className='card card-body'>
                                <div className='row'>
                                    <div className='col-md-7'>
                                        <TextField
                                            label="CEP"
                                            style={(state.isLoadingCep) ? { opacity: 0.5 } : {}}
                                            error={(data.error.zipCode) && true}
                                            type="tel"
                                            InputProps={{
                                                inputComponent: TextMaskCustom,
                                                value: data.vehicle.zipCode,
                                                onChange: text => {
                                                    dispatch(change({ zipCode: text.target.value }))
                                                    if (text.target.value.length > 8) {
                                                        setState({ isLoadingCep: true })
                                                        dispatch(get_cep(text.target.value))
                                                            .then(res => {
                                                                if (res) setState({ isLoadingCep: false })
                                                            })
                                                            .catch(error => {
                                                                setState({ isLoadingCep: false })
                                                            })

                                                        if (data.error.zipCode) {
                                                            delete data.error.zipCode;
                                                            delete data.error.uf;
                                                            delete data.error.city;
                                                        }
                                                    }
                                                },
                                                endAdornment: (
                                                    <InputAdornment position="start">
                                                        {(state.isLoadingCep) ?
                                                            <CircularProgress size={32} /> :
                                                            <></>
                                                        }
                                                    </InputAdornment>)
                                            }}
                                        />
                                        {(data.error.zipCode) &&
                                            <strong className='text-danger'>{data.error.zipCode[0]}</strong>
                                        }
                                    </div>
                                </div>

                                <div className='row mt-2'>
                                    <div className='col-md-9 form-group'>
                                        <TextField
                                            label=""
                                            error={(data.error.city) && true}
                                            disabled
                                            value={data.vehicle.city || ''}
                                        />
                                        {(data.error.city) &&
                                            <strong className='text-danger'>{data.error.city[0]}</strong>
                                        }
                                    </div>
                                    <div className='col-md-3 form-group'>
                                        <TextField
                                            label=""
                                            error={(data.error.uf) && true}
                                            disabled
                                            value={data.vehicle.uf || ''}
                                        />
                                        {(data.error.city) &&
                                            <strong className='text-danger'>{data.error.uf[0]}</strong>
                                        }
                                    </div>
                                </div>
                            </div>

                            <h3 className='font-weight-normal mt-4 mb-4'> Dados do Veiculo </h3>
                            <div className='card card-body'>
                                <div className='form-group'>
                                    <label className='label-custo'>Categoria</label>
                                    <Select
                                        label="Categoria"
                                        error={data.error.vehicle_type && true}
                                        value={data.vehicle.vehicle_type || ''}
                                        onChange={event => {
                                            dispatch(change({
                                                vehicle_type: event.target.value,
                                                vehicle_brand: null,
                                                vehicle_model: null,
                                                vehicle_version: null,
                                                vehicle_gearbox: null,
                                                vehicle_fuel: null,
                                                vehicle_steering: null,
                                                vehicle_motorpower: null,
                                                vehicle_doors: null
                                            }));

                                            dispatch(brand(event.target.value))
                                            if (data.error.vehicle_type) {
                                                delete data.error.vehicle_type
                                            }
                                        }}
                                        fullWidth
                                    >
                                        {data.types?.map(item => (
                                            <MenuItem key={item.id} value={item.value}>{item.label}</MenuItem>
                                        ))}
                                    </Select>
                                    {(data.error.vehicle_type) &&
                                        <strong className='text-danger'>{data.error.vehicle_type[0]}</strong>
                                    }
                                </div>

                                <div className='form-group'>
                                    <label className='label-custom'>Marcas</label>
                                    <Select
                                        label="Marcas"
                                        error={data.error.vehicle_brand && true}
                                        value={data.vehicle.vehicle_brand || ''}
                                        onChange={event => {
                                            dispatch(change({
                                                vehicle_brand: event.target.value,
                                                vehicle_model: null,
                                                vehicle_version: null,
                                                // vehicle_gearbox: null,
                                                // vehicle_fuel: null,
                                                // vehicle_steering: null,
                                                // vehicle_motorpower: null,
                                                // vehicle_doors: null
                                            }));

                                            dispatch(model(data.vehicle.vehicle_type, event.target.value))
                                            if (data.error.vehicle_brand) {
                                                delete data.error.vehicle_brand
                                            }
                                        }}
                                        fullWidth
                                    >
                                        {data.vehicle_brand?.map(item => (
                                            <MenuItem key={item.id} value={item.value}>{item.label}</MenuItem>
                                        ))}
                                    </Select>
                                    {(data.error.vehicle_brand) &&
                                        <strong className='text-danger'>{data.error.vehicle_brand[0]}</strong>
                                    }
                                </div>

                                <div className='row'>
                                    <div className='col-md-6 form-group'>
                                        <label className='label-custom'>Modelo</label>
                                        <Select
                                            label="Marcas"
                                            error={data.error.vehicle_model && true}
                                            value={data.vehicle.vehicle_model || 0}
                                            onChange={event => {
                                                dispatch(change({
                                                    vehicle_model: event.target.value,
                                                    vehicle_version: null
                                                }));

                                                dispatch(version(data.vehicle.vehicle_brand, event.target.value))
                                                if (data.error.vehicle_model) {
                                                    delete data.error.vehicle_model
                                                }
                                            }}
                                            fullWidth
                                        >
                                            {data.vehicle_model?.map(item => (
                                                <MenuItem key={item.id} value={item.value}>{item.label}</MenuItem>
                                            ))}
                                        </Select>
                                        {(data.error.vehicle_model) &&
                                            <strong className='text-danger'>{data.error.vehicle_model[0]}</strong>
                                        }
                                    </div>
                                    <div className='col-md-6 form-group'>
                                        <div className='col-md-6 form-group'>
                                            <label className='label-custom'>Ano do modelo</label>
                                            <Select
                                                label="Ano"
                                                error={data.error.regdate && true}
                                                value={data.vehicle.vehicle_regdate || 0}
                                                onChange={event => {
                                                    dispatch(change({
                                                        vehicle_regdate: event.target.value,
                                                    }));

                                                    if (data.error.regdate) {
                                                        delete data.error.regdate
                                                    }

                                                    // dispatch(version(data.vehicle.vehicle_brand, event.target.value))
                                                    // if (data.error.vehicle_model) {
                                                    //     delete data.error.vehicle_model
                                                    // }
                                                }}
                                                fullWidth
                                            >
                                                {data.regdate?.map(item => (
                                                    <MenuItem key={item.id} value={item.value}>{item.label}</MenuItem>
                                                ))}
                                            </Select>
                                            {(data.error.regdate) &&
                                                <strong className='text-danger'>{data.error.regdate[0]}</strong>
                                            }
                                        </div>
                                    </div>

                                    <div className='col-md-6 form-group'>
                                        <label className='label-custom'>Versão</label>
                                        <Select
                                            label="Versão"
                                            error={data.error.vehicle_version && true}
                                            value={data.vehicle.vehicle_version || 0}
                                            onChange={event => {
                                                dispatch(change({
                                                    vehicle_version: event.target.value,
                                                }));

                                                if (data.error.vehicle_version) {
                                                    delete data.error.vehicle_version
                                                }

                                                // dispatch(version(data.vehicle.vehicle_brand, event.target.value))
                                                // if (data.error.vehicle_model) {
                                                //     delete data.error.vehicle_model
                                                // }
                                            }}
                                            fullWidth
                                        >
                                            {data.vehicle_version?.map(item => (
                                                <MenuItem key={item.id} value={item.value}>{item.label}</MenuItem>
                                            ))}
                                        </Select>
                                        {(data.error.vehicle_version) &&
                                            <strong className='text-danger'>{data.error.vehicle_version[0]}</strong>
                                        }
                                    </div>

                                </div>
                            </div>
                            {(data.vehicle.vehicle_type === 2020) &&
                                <div className='card card-body mt-2'>
                                    <div className='row'>

                                        <>
                                            <div className='col-md-6 form-group'>
                                                <label className='label-custom'>Câmbio</label>
                                                <Select
                                                    fullWidth
                                                    value={data.vehicle.vehicle_gearbox || 0}
                                                    onChange={event => {
                                                        dispatch(change({ vehicle_gearbox: event.target.value }))
                                                    }}
                                                >
                                                    {data.gearbox?.map(item => (
                                                        <MenuItem key={item.id} value={item.value}>{item.label}</MenuItem>
                                                    ))}
                                                </Select>
                                            </div>

                                            <div className='col-md-6 form-group'>
                                                <label className='label-custom'>Combustível</label>
                                                <Select
                                                    fullWidth
                                                    value={data.vehicle.vehicle_fuel || 0}
                                                    onChange={event => {
                                                        dispatch(change({ vehicle_fuel: event.target.value }))
                                                    }}
                                                >
                                                    {data.fuel?.map(item => (
                                                        <MenuItem key={item.id} value={item.value}>{item.label}</MenuItem>
                                                    ))}
                                                </Select>
                                            </div>


                                            <div className='col-md-6 form-group'>
                                                <label className='label-custom'>Direção</label>
                                                <Select
                                                    fullWidth
                                                    value={data.vehicle.vehicle_steering || 0}
                                                    onChange={event => {
                                                        dispatch(change({ vehicle_steering: event.target.value }))
                                                    }}
                                                >
                                                    {data.car_steering?.map(item => (
                                                        <MenuItem key={item.id} value={item.value}>{item.label}</MenuItem>
                                                    ))}
                                                </Select>
                                            </div>
                                            <div className='col-md-6 form-group'>
                                                <label className='label-custom'>Potência do motor</label>
                                                <Select
                                                    fullWidth
                                                    value={data.vehicle.vehicle_motorpower || 0}
                                                    onChange={event => {
                                                        dispatch(change({ vehicle_motorpower: event.target.value }))
                                                    }}
                                                >
                                                    {data.motor_power?.map(item => (
                                                        <MenuItem key={item.id} value={item.value}>{item.label}</MenuItem>
                                                    ))}
                                                </Select>
                                            </div>

                                            <div className='col-md-6 form-group'>
                                                <label className='label-custom'>Portas</label>
                                                <Select
                                                    fullWidth
                                                    value={data.vehicle.vehicle_doors || 0}
                                                    onChange={event => {
                                                        dispatch(change({ vehicle_doors: event.target.value }))
                                                    }}
                                                >
                                                    {data.doors?.map(item => (
                                                        <MenuItem key={item.id} value={item.value}>{item.label}</MenuItem>
                                                    ))}
                                                </Select>
                                            </div>
                                        </>

                                    </div>
                                </div>
                            }

                            {(data.vehicle.vehicle_type === 2060) &&
                                <div className='card card-body mt-2'>
                                    <div className='row'>
                                        <>
                                            <div className='col-md-6 form-group'>
                                                <label className='label-custom'>Cilindradas</label>
                                                <Select
                                                    fullWidth
                                                    value={data.vehicle.vehicle_cubccms || 0}
                                                    onChange={event => {
                                                        dispatch(change({ vehicle_cubccms: event.target.value }))
                                                    }}
                                                >
                                                    {data.cubccms?.map(item => (
                                                        <MenuItem key={item.id} value={item.value}>{item.label}</MenuItem>
                                                    ))}
                                                </Select>
                                            </div>

                                            <div className='col-md-6 form-group'>
                                                <label className='label-custom'>Cor</label>
                                                <Select
                                                    fullWidth
                                                    value={data.vehicle.vehicle_color || 0}
                                                    onChange={event => {
                                                        dispatch(change({ vehicle_color: event.target.value }))
                                                    }}
                                                >
                                                    {data.carcolor?.map(item => (
                                                        <MenuItem key={item.id} value={item.value}>{item.label}</MenuItem>
                                                    ))}
                                                </Select>
                                            </div>

                                            <div className='col-md-6 form-group'>
                                                <label className='label-custom'>Km</label>
                                                <TextField
                                                    type="tel"
                                                    InputProps={{
                                                        inputComponent: NumberFormatCustom,
                                                        value: data.vehicle.vehicle_mileage || '',
                                                        onChange: text => dispatch(change({ vehicle_mileage: text.target.value }))
                                                    }} />
                                            </div>
                                        </>
                                    </div>
                                </div>
                            }
                        </div>
                    </div>
                )}

                {(state.vehicle_id) ?
                    (<span>Veiculo edit {state.vehicle_id}</span>) :
                    (<span > Veiculo create</span>)
                }

            </div>
        </React.Fragment >
    )
}
