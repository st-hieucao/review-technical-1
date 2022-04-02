import React, { useEffect } from 'react';
import style from './style.module.scss';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from "react-hook-form";
import * as yup from 'yup';
import * as CardValidator from 'card-validator';
import { useHistory } from 'react-router-dom';

const schema = yup.object({
  cardNumber: yup.string().required('card number required').test('errorCode', 'error card number', (val) => CardValidator.number(val).isValid === true),
  expireDate: yup.string().required('expire date required').test('errorExpireDate', 'error expire date', (val) => CardValidator.expirationDate(val).isValid === true),
  securityCode: yup.string().required('security code required').test('errorSecurityCode', 'error security code', (val) => CardValidator.postalCode(val).isValid === true),
}).required();

const Order = () => {
  const { register, handleSubmit, formState: { errors } } = useForm({
    mode: 'onBlur',
    resolver: yupResolver(schema)
  });

  const history = useHistory();
  const pizza = JSON.parse(localStorage.getItem('type')) || {};
  const toppings = JSON.parse(localStorage.getItem('toppings')) || [];

  useEffect(() => {
    if(toppings.length === 0 || Object.keys(pizza).length <= 0) {
      history.push('/');
    }
  }, [])

  const onSubmit = data => {
    const info = {
      ...data,
      type: pizza.type,
      toppings: toppings.map(item => item.type)
    }
    alert(JSON.stringify(info))
  }

  return (
    <div className={style.formInfo}>
      <img src='./images/bg.jpeg' className={style.image} alt='bg' />
      <form className={style.form} onSubmit={handleSubmit(onSubmit)}>
        <h2 className={style.formTitle}>Your info</h2>
        <div className={style.formDouble}>
          <label>
            <span className={style.labelText}>Name</span>
            <input className={style.formInput} {...register("name", { required: true })} />
            {errors.name && <span className={style.error}>{errors.name.message}</span>}
          </label>
          <label>
            <span className={style.labelText}>House number</span>
            <input className={style.formInput} {...register("houseNumber", { required: true })} />
          </label>
        </div>
        <label>
          <span className={style.labelText}>Street</span>
          <input className={style.formInput} {...register("street", { required: true })} />
        </label>
        <div className={style.formDouble}>
          <label>
            <span className={style.labelText}>Postal code</span>
            <input className={style.formInput} {...register("postalCode", { required: true })} />
          </label>
          <label>
            <span className={style.labelText}>City</span>
            <input className={style.formInput} {...register("city", { required: true })} />
          </label>
        </div>
        <div className={style.formDouble}>
          <label>
            <span className={style.labelText}>Phone number</span>
            <input className={style.formInput} {...register("phoneNumber", { required: true })} />
          </label>
          <label>
            <span className={style.labelText}>Credit card</span>
            <input className={style.formInput} {...register("cardNumber", { required: true })} />
            {errors.cardNumber && <span className={style.error}>{errors.cardNumber.message}</span>}
          </label>
        </div>
        <div className={style.formDouble}>
          <label>
            <span className={style.labelText}>Expiration date</span>
            <input className={style.formInput} {...register("expireDate", { required: true })} />
            {errors.expireDate && <span className={style.error}>{errors.expireDate.message}</span>}
          </label>
          <label>
            <span className={style.labelText}>Security Code</span>
            <input className={style.formInput} {...register("securityCode", { required: true })} />
            {errors.securityCode && <span className={style.error}>{errors.securityCode.message}</span>}
          </label>
          </div>
        <button className={style.orderBtn}>Order</button>
      </form>
    </div>
  )
}

export default Order