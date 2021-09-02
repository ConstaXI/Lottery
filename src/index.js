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
        const $save = document.getElementById('cart-save')
        const $completeGame = document.getElementById('complete-game')
        const $description = document.getElementById('game-description')
        const $betContainer = document.getElementById('bet-container')

        const xhr = new XMLHttpRequest()

        const total = {
            lotofacil: new Set(),
            megasena: new Set(),
            lotomania: new Set()
        }

        return {
            init: function () {
                xhr.open('GET', './games.json')
                xhr.send()
                this.initEvents()
            },

            initEvents: function () {
                $addToCart.addEventListener('click', () => this.addDivToCart($addToCart), false)
                $clear.addEventListener('click', this.clearChecks, false)
                $save.addEventListener('click', this.handleSubmit, false)
                $completeGame.addEventListener('click', this.completeGame, false)
                $lotofacil.addEventListener('change', () => this.changeGameRules('lotofacil'), false)
                $megasena.addEventListener('change', () => this.changeGameRules('megasena'), false)
                $lotomania.addEventListener('change', () => this.changeGameRules('lotomania'), false)
                xhr.addEventListener('readystatechange', this.loadGameConfig, false)
            },

            loadGameConfig: function () {
                if (!(xhr.status === 200 && xhr.readyState === 4)) {
                    return
                }

                return JSON.parse(xhr.response)
            },

            changeGameRules: function (lotteryType) {
                $betContainer.innerHTML = ''

                const gameConfig = app.loadGameConfig().types

                let lottery

                switch (lotteryType) {
                    case 'lotofacil': {
                        lottery = gameConfig[0]
                        break
                    }
                    case 'megasena': {
                        lottery = gameConfig[1]
                        break
                    }
                    case 'lotomania': {
                        lottery = gameConfig[2]
                        break
                    }
                }

                $description.innerText = lottery.description

                for (let i = 1; i <= lottery.range; i++) {
                    const $lotteryNumber = document.createElement('input')
                    const $lotteryNumberLabel = document.createElement('label')

                    $lotteryNumber.setAttribute('type', 'checkbox')
                    $lotteryNumber.setAttribute('id', i.toString())
                    $lotteryNumber.setAttribute('class', 'bet')

                    $lotteryNumberLabel.setAttribute('class', 'bet-label')
                    $lotteryNumberLabel.setAttribute('for', i.toString())
                    $lotteryNumberLabel.innerText = i.toString()

                    $betContainer.appendChild($lotteryNumber)
                    $betContainer.appendChild($lotteryNumberLabel)
                }
            },

            generateNumbers: function* (array) {
                let i = array.length

                while (i--) {
                    yield array.splice(Math.floor(Math.random() * (i + 1)), 1)[0]
                }
            },

            completeGame: function () {
                app.clearChecks()

                const numbers = Array.from({length: 36}, (_, index) => index + 1)
                const generated = app.generateNumbers(numbers)
                const randomNumbers = Array.from({length: 20}, (_) => generated.next().value)


                randomNumbers.forEach(randomNumber => {
                    Array.prototype.forEach.call($lotteryNumbers, ($lotteryNumber) => {
                        $lotteryNumber.disabled = true

                        if (randomNumber === +$lotteryNumber.id) {
                            $lotteryNumber.checked = true
                        }
                    })
                })
            },

            handleSubmit: function (e) {
                e.preventDefault()

                console.dir({
                    lotofacil: Array.from(total.lotofacil),
                    megasena: Array.from(total.megasena),
                    lotomania: Array.from(total.lotomania),
                    sum: app.getTotal()
                })

                return {
                    lotofacil: Array.from(total.lotofacil),
                    megasena: Array.from(total.megasena),
                    lotomania: Array.from(total.lotomania),
                    sum: app.getTotal()
                }
            },

            addNumberToDivCart: function ($option) {
                const lotteryType = $option.id.match(/(\w+$)/)[0]

                const newNumbers = this.getLotteryNumbers(lotteryType)

                Array.prototype.forEach.call(newNumbers, (number) => {
                    total[lotteryType].add(number)
                })

                $option.children[0].textContent = Array.from(total[lotteryType]).toString()
                $option.children[1].children[1].textContent = 'R$ ' + (newNumbers.length * 0.35).toFixed(2).toString()

                this.getTotal()
            },

            getTotal: function () {
                const array = []

                array.push(Array.from(total.lotofacil))
                array.push(Array.from(total.megasena))
                array.push(Array.from(total.lotomania))

                const sum = Number((array.flat(1).length * 0.35).toFixed(2))

                $totalSum.innerText = 'R$ ' + sum.toString()

                return sum
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
                    $number.disabled = false
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

            removeCartItem: function ($iconAndNumbers) {
                $iconAndNumbers.remove()

                const lotteryType = $iconAndNumbers.id.match(/(\w+$)/)[0]

                total[lotteryType].clear()

                app.getTotal()
            },
        }
    })()

    app.init()

})(window, document)