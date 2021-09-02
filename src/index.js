(function (window, document) {
    'use strict';

    const app = (() => {
        const $lotofacil = document.getElementById('lotofacil')
        const $megasena = document.getElementById('mega-sena')
        const $lotomania = document.getElementById('lotomania')
        const $cartItems = document.getElementById('cart-items')
        const $lotteryNumbers = document.getElementsByClassName('bet')
        const $addToCart = document.getElementById('add-to-cart')
        const $clear = document.getElementById('clear')
        const $totalSum = document.getElementById('total-sum')
        const total = {
            lotofacil: new Set(),
            megasena: new Set(),
            lotomania: new Set()
        }

        return {
            init: function () {
                this.initEvents()
            },

            initEvents: function () {
                $addToCart.addEventListener('click', () => this.addDivToCart($addToCart), false)
                $clear.addEventListener('click', () => this.clearChecks(), false)
            },

            addNumberToDivCart: function ($option) {
                const lotteryType = $option.id.match(/(\w+$)/)[0]

                const newNumbers = this.getLotteryNumbers(lotteryType)

                Array.prototype.forEach.call(newNumbers, (number) => {
                    total[lotteryType].add(number)
                })

                $option.children[0].textContent = Array.from(total[lotteryType]).toString()

                this.getTotal()
            },

            getTotal: function() {
                const array = []

                array.push(Array.from(total.lotofacil))
                array.push(Array.from(total.megasena))
                array.push(Array.from(total.lotomania))

                $totalSum.innerText = 'R$ ' + (array.flat(1).length * 0.35).toFixed(2).toString()
            },

            getLotteryNumbers: function (id) {
                Array.prototype.forEach.call($lotteryNumbers, ($number) => {
                    $number.checked ? total[id].add(+$number.id) : ''
                })

                return Array.from(total[id])
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

                const $iconAndNumbers = document.createElement('div')
                const $number = document.createElement('p')
                const $cartNumbersType = document.createElement('div')
                const $lottery = document.createElement('p')
                const $price = document.createElement('p')
                const $trashIcon = document.createElement('img')
                const $cartNumbersContainer = document.createElement('div')

                $trashIcon.setAttribute('src', './assets/trash_can.png')
                $trashIcon.setAttribute('alt', 'trash can')
                $trashIcon.setAttribute('class', 'trash-icon')

                $trashIcon.addEventListener('click', () => app.removeCartItem($iconAndNumbers), false)

                $iconAndNumbers.setAttribute('class', 'icon-and-numbers')

                if ($lotofacil.checked) {
                    const numbers = app.getLotteryNumbers('lotofacil')
                    $number.innerText = numbers.toString()
                    $price.innerText = 'R$ ' + (numbers.length * 0.35).toFixed(2).toString()

                    $iconAndNumbers.setAttribute('id', 'icon-and-numbers-lotofacil')
                    $cartNumbersContainer.setAttribute('id', `cart-numbers-container-lotofacil`)
                    $lottery.setAttribute('id', 'lottery-lotofacil')
                    $lottery.innerText = 'Lotofácil'
                } else if ($megasena.checked) {
                    const numbers = app.getLotteryNumbers('megasena')
                    $number.innerText = numbers.toString()
                    $price.innerText = 'R$ ' + (numbers.length * 0.35).toFixed(2).toString()

                    $iconAndNumbers.setAttribute('id', 'icon-and-numbers-megasena')
                    $cartNumbersContainer.setAttribute('id', `cart-numbers-container-megasena`)
                    $lottery.setAttribute('id', 'lottery-megasena')
                    $lottery.innerText = 'Mega-Sena'
                } else if ($lotomania.checked) {
                    const numbers = app.getLotteryNumbers('lotomania')
                    $number.innerText = numbers.toString()
                    $price.innerText = 'R$ ' + (numbers.length * 0.35).toFixed(2).toString()

                    $iconAndNumbers.setAttribute('id', 'icon-and-numbers-lotomania')
                    $cartNumbersContainer.setAttribute('id', `cart-numbers-container-lotomania`)
                    $lottery.setAttribute('id', 'lottery-lotomania')
                    $lottery.innerText = 'Lotomania'
                }

                $cartNumbersType.setAttribute('class', 'cart-numbers-type')

                $cartNumbersType.appendChild($lottery)
                $cartNumbersType.appendChild($price)
                $cartNumbersContainer.appendChild($number)
                $cartNumbersContainer.appendChild($cartNumbersType)
                $iconAndNumbers.appendChild($trashIcon)
                $iconAndNumbers.appendChild($cartNumbersContainer)
                $cartItems.appendChild($iconAndNumbers)

                app.getTotal()
                app.clearChecks()
            },

            removeCartItem: function($iconAndNumbers) {
                $iconAndNumbers.remove()

                const lotteryType = $iconAndNumbers.id.match(/(\w+$)/)[0]

                total[lotteryType].clear()

                app.getTotal()
            },
        }
    })()

    app.init()

})(window, document)