import './AboutFilm.scss'
import { FC } from 'react'
import { movieInfoType } from '../../types/Films/filmsType'
import { languageTranslation, translateMoney } from '../../utils/utils'

interface AboutFilmProps {
    film: movieInfoType
}

export const AboutFilm: FC<AboutFilmProps> = ({film}) => {
    return (
        <ul className="list-reset about-film__list">
            <h2 className='about-film__title'>О фильме</h2>
            <li className='about-film__item'>
                <p className='about-film__prop'>Язык оригинала</p>
                <p className='about-film__value'>{languageTranslation(film.language)}</p>
            </li>
            <li className='about-film__item'>
                <p className='about-film__prop'>Бюджет</p>
                <p className='about-film__value'>{translateMoney(film.budget)}</p>
            </li>
            <li className='about-film__item'>
                <p className='about-film__prop'>Выручка</p>
                <p className='about-film__value'>{translateMoney(film.revenue)}</p>
            </li>
            <li className='about-film__item'>
                <p className='about-film__prop'>Режиссер</p>
                <p className='about-film__value'>{film.director ? film.director : "Нет информации"}</p>
            </li>
            <li className='about-film__item'>
                <p className='about-film__prop'>Продакшен</p>
                <p className='about-film__value'>{film.production ? film.production : "Нет информации"}</p>
            </li>
            <li className='about-film__item'>
                <p className='about-film__prop'>Награды</p>
                <p className='about-film__value'>{film.awardsSummary ? film.awardsSummary : "Нет информации"}</p>
            </li>
        </ul>
    )
}