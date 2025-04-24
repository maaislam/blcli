import { h, render, Component } from 'preact';

export const BrandList = ({chooseBrand, updateSizes}) => (
    <select class="c-field-select BV-select BV-select_brands" onChange={(e) => {
        chooseBrand(e.target.value)
        updateSizes(e.target.options[event.target.selectedIndex]);
        }}>
        <option disabled selected value>Select what brand this bra is</option>
        <option value="Anita" data-cup="0" data-back="0">Anita</option>
        <option value="Bluebella" data-cup="0" data-back="0">Bluebella</option>
        <option value="Bravissimo" data-cup="0" data-back="0">Bravissimo</option>
        <option value="Calvin Klein" data-cup="0" data-back="0">Calvin Klein</option>
        <option value="Chantelle" data-cup="0" data-back="0">Chantelle</option>
        <option value="Cleo" data-cup="0" data-back="0">Cleo</option>
        <option value="Curvy Kate" data-cup="0" data-back="0">Curvy Kate</option>
        <option value="Fantasie" data-cup="0" data-back="0">Fantasie</option>
        <option value="Freya" data-cup="0" data-back="0">Freya</option>
        <option value="Glamorise" data-cup="0" data-back="0">Glamorise</option>
        <option value="Goddess" data-cup="0" data-back="0">Goddess</option>
        <option value="Gossard" data-cup="0" data-back="0">Gossard</option>
        <option value="M&amp;S" data-cup="1">M&amp;S</option>
        <option value="Marie Jo" data-cup="0" data-back="0">Marie Jo</option>
        <option value="Mimi Holiday" data-cup="0" data-back="0">Mimi Holiday</option>
        <option value="Nubian Skin" data-cup="0" data-back="0">Nubian Skin</option>
        <option value="Panache" data-cup="0" data-back="0">Panache</option>
        <option value="Prima Donna" data-cup="1">Prima Donna</option>
        <option value="Rougette" data-cup="0" data-back="0">Rougette</option>
        <option value="Royce" data-cup="1" data-back="1">Royce</option>
        <option value="Rosa Faia" data-cup="0" data-back="0">Rosa Faia</option>
        <option value="Shock Absorber" data-back="1">Shock Absorber</option>
        <option value="Sugar Candy" data-cup="0" data-back="0">Sugar Candy</option>
        {/* <option value="Brands we don't stock">Brands we don't stock</option> */}
        <option value="Simone Perele" data-cup="0" data-back="0">Simone Perele</option>
        <option value="Third Love" data-cup="0" data-back="0">Third Love</option>
        <option value="Triumph" data-cup="-1" >Triumph</option>
        <option value="Ultimo" data-cup="0" data-back="0">Ultimo</option>
        <option value="Victoria's Secret" data-cup="0" data-back="0">Victoria's Secret</option>
        <option value="Wacoal (brand)" data-cup="-1" data-back="-1">Wacoal</option>
        <option value="Wonderbra" data-back="1">Wonderbra</option>
        <option value="Other" data-cup="0" data-back="0">Other</option>
    </select>
);
