(function (window, document) {
    'use strict';

    const app = (() => {
        const $lotofacil = document.getElementById('lotofacil')
        const $megasena = document.getElementById('mega-sena')
        const $lotomania = document.getElementById('lotomania')
        const $cartItems = document.getElementById('cart-items')
        const $lotteryNumbers = document.getElementsByClassName('bet')
        const $addToCart = document.getElementById('add-to-cart')
        const $total = document.getElementById('total')

        return {
            init: function () {
                this.initEvents()
            },

            initEvents: function () {
                $addToCart.addEventListener('click', () => this.addDivToCart($addToCart), false)
            },

            addNumberToDivCart: function ($option) {
                $option.children[0].textContent += ', ' + this.getLotteryNumbers()
            },

            getTotal: function() {
                const $1 = document.getElementById('cart-numbers-container-lotofacil')
                const $2 = document.getElementById('cart-numbers-container-megasena')
                const $3 = document.getElementById('cart-numbers-container-lotomania')

                const lotofacil = Array.from($1.children[0].textContent)
                const megasena = Array.from($2.children[0].textContent)
                const lotomania = Array.from($3.children[0].textContent)

                console.log(lotofacil.length, megasena.length, lotomania.length)
            },

            getLotteryNumbers: function () {
                const numbers = new Set()

                Array.prototype.forEach.call($lotteryNumbers, ($number) => {
                    $number.checked ? numbers.add(+$number.id) : ''
                })

                return Array.from(numbers).join(', ')
            },

            clearChecks: function () {
                Array.prototype.forEach.call($lotteryNumbers, ($number) => {
                    $number.checked = false
                })
            },

            addDivToCart: function () {
                const $1 = document.getElementById('cart-numbers-container-lotofacil')
                const $2 = document.getElementById('cart-numbers-container-megasena')
                const $3 = document.getElementById('cart-numbers-container-lotomania')

                if ($1 && $lotofacil.checked) {
                    app.addNumberToDivCart($1)
                    app.clearChecks()
                    return
                } else if ($2 && $megasena.checked) {
                    app.addNumberToDivCart($2)
                    app.clearChecks()
                    return
                } else if ($3 && $lotomania.checked) {
                    app.addNumberToDivCart($3)
                    app.clearChecks()
                    return
                }

                const numbers = app.getLotteryNumbers()

                const $iconAndNumbers = document.createElement('div')
                const $number = document.createElement('p')
                const $cartNumbersType = document.createElement('div')
                const $lottery = document.createElement('p')
                const $price = document.createElement('p')
                const $trashIcon = document.createElement('img')
                const $cartNumbersContainer = document.createElement('div')

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

                $number.innerText = numbers.toString()
                $price.innerText = 'R$ ' + (numbers.length * 0.50).toString()

                $cartNumbersType.appendChild($lottery)
                $cartNumbersType.appendChild($price)
                $cartNumbersContainer.appendChild($number)
                $cartNumbersContainer.appendChild($cartNumbersType)
                $iconAndNumbers.appendChild($trashIcon)
                $iconAndNumbers.appendChild($cartNumbersContainer)
                $cartItems.appendChild($iconAndNumbers)

                app.getTotal()
                app.clearChecks()
            }
        }
    })()

    app.init()

})(window, document)