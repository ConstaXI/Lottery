(function(window, document){
    'use strict';

    const app = (() => {
        const $lotofacil = document.getElementById('lotofacil')
        const $megasena = document.getElementById('mega-sena')
        const $lotomania = document.getElementById('lotomania')
        const $cartItems = document.getElementById('cart-items')
        const $lotteryNumbers = document.getElementsByClassName('bet')
        const $addToCart = document.getElementById('add-to-cart')

        return {
            init: function () {
                this.initEvents()
            },

            initEvents: function () {
                $addToCart.addEventListener('click', () => this.addDivToCart($addToCart), false)
            },

            addNumberToDivCart: function (lotteryType, id) {

            },

            getLotteryNumbers: function() {
                const numbers = []

                Array.prototype.forEach.call($lotteryNumbers, ($number) => {
                    $number.checked ? numbers.push(+$number.id) : ''
                })

                return numbers
            },

            addDivToCart: function() {
                const numbers = app.getLotteryNumbers()

                const $iconAndNumbers = document.createElement('div')
                const $number = document.createElement('p')
                const $cartNumbersType = document.createElement('div')
                const $lottery = document.createElement('p')
                const $price = document.createElement('p')
                const $trashIcon = document.createElement('img')
                const $cartNumbersContainer = document.createElement('div')
                const $total = document.getElementById('total')

                $trashIcon.setAttribute('src', './assets/trash_can.png')
                $trashIcon.setAttribute('alt', 'trash can')
                $trashIcon.setAttribute('class', 'icon')
                $iconAndNumbers.setAttribute('class', 'icon-and-numbers')

                if ($lotofacil.checked) {
                    $cartNumbersContainer.setAttribute('id', `cart-numbers-container-lotofacil`)
                    $lottery.setAttribute('id', 'lottery-lotofacil')
                    $lottery.innerText = 'Lotofácil'
                } else if ($megasena.checked) {
                    $cartNumbersContainer.setAttribute('id', `cart-numbers-container-megasena`)
                    $lottery.setAttribute('id', 'lottery-megasena')
                    $lottery.innerText = 'Mega-Sena'
                } else if ($lotomania.checked) {
                    $cartNumbersContainer.setAttribute('id', `cart-numbers-container-lotomania`)
                    $lottery.setAttribute('id', 'lottery-lotomania')
                    $lottery.innerText = 'Lotomania'
                }

                $cartNumbersType.setAttribute('class', 'cart-numbers-type')
                $lottery.setAttribute('id', '')

                $number.innerText = numbers.toString()
                $price.innerText = 'R$ ' + (numbers.length * 0.50).toString()

                $cartNumbersType.appendChild($lottery)
                $cartNumbersType.appendChild($price)
                $cartNumbersContainer.appendChild($number)
                $cartNumbersContainer.appendChild($cartNumbersType)
                $iconAndNumbers.appendChild($trashIcon)
                $iconAndNumbers.appendChild($cartNumbersContainer)
                $cartItems.appendChild($iconAndNumbers)
            }
        }
    })()

    app.init()

})(window, document)