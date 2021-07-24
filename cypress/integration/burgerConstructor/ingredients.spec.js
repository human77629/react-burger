/// <reference types="cypress" />


describe('ingredients work correctly', function() {
    before(()=>{
        cy.visit('http://localhost:3000')
    })
    
    it('should make ingredients draggable',()=>{
        cy.get('[class^=BurgerIngredient_container').first().as('bun')
        cy.get('[class^=BurgerIngredient_container').last().as('topping')
        cy.get('@bun').should('have.attr', 'draggable', 'true')
        cy.get('@topping').should('have.attr', 'draggable', 'true')
    })

    it('should handle selecting a bun via dnd', ()=>{
        cy.wait(500)
        cy.get('[class^=BurgerIngredient_container').first().trigger("dragstart").trigger("dragleave");
        cy.wait(500)
        cy.get('[class^=BurgerConstructor_components__').first().trigger("dragenter")
        .trigger("dragover")
        .trigger("drop")
        cy.wait(500)
        cy.get('[class^=BurgerConstructor_components__').first().trigger("dragend");


        cy.get('[class^=BurgerConstructor_components__').contains('булка')
        cy.get('[class^=BurgerIngredient_container').first().children('div').first().children('p').first().should($p=>{expect($p).to.have.text('2')})
    })

    it('should handle replacing the bun with another one via dnd', ()=>{

        cy.wait(500)
        cy.get('[class^=BurgerIngredients_ingredientsContainer__').first().
        children('li').last().trigger("dragstart").trigger("dragleave");
        cy.wait(500)
        cy.get('[class^=BurgerConstructor_components__').first().trigger("dragenter")
        .trigger("dragover")
        .trigger("drop")
        cy.wait(500)
        cy.get('[class^=BurgerConstructor_components__').first().trigger("dragend");

        cy.get('[class^=BurgerConstructor_components__').contains('Флюоресцентная булка')
        cy.get('[class^=BurgerIngredients_ingredientsContainer__').first().
        children('li').last().children('div').first().children('p').first().should($p=>{expect($p).to.have.text('2')})        
    })    


    it('should handle adding toppings via dnd', ()=>{

        cy.wait(500)
        cy.get('[class^=BurgerIngredient_container').last().trigger("dragstart").trigger("dragleave");
        cy.wait(500)
        cy.get('[class^=BurgerConstructor_components__').first().trigger("dragenter")
        .trigger("dragover")
        .trigger("drop")
        cy.wait(500)
        cy.get('[class^=BurgerConstructor_components__').first().trigger("dragend");
        cy.get('[class^=BurgerIngredient_container').last().children('div').first().children('p').first().should($p=>{expect($p).to.have.text('1')})

        cy.wait(500)
        cy.get('[class^=BurgerIngredients_ingredientsContainer__').last().
        children('li').first().trigger("dragstart").trigger("dragleave");
        cy.wait(500)
        cy.get('[class^=BurgerConstructor_components__').first().trigger("dragenter")
        .trigger("dragover")
        .trigger("drop")
        cy.wait(500)
        cy.get('[class^=BurgerConstructor_components__').first().trigger("dragend");
        cy.get('[class^=BurgerIngredients_ingredientsContainer__').last().
        children('li').first().children('div').first().children('p').first().should($p=>{expect($p).to.have.text('1')})

        cy.wait(500)
        cy.get('[class^=BurgerIngredients_ingredientsContainer__').last().
        children('li').eq(4).trigger("dragstart").trigger("dragleave");
        cy.wait(500)
        cy.get('[class^=BurgerConstructor_components__').first().trigger("dragenter")
        .trigger("dragover")
        .trigger("drop")
        cy.wait(500)
        cy.get('[class^=BurgerConstructor_components__').first().trigger("dragend");      
        cy.get('[class^=BurgerIngredients_ingredientsContainer__').last().
        children('li').eq(4).children('div').first().children('p').first().should($p=>{expect($p).to.have.text('1')})  

        cy.wait(500)
        cy.get('[class^=BurgerIngredients_ingredientsContainer__').last().
        children('li').eq(4).trigger("dragstart").trigger("dragleave");
        cy.wait(500)
        cy.get('[class^=BurgerConstructor_components__').first().trigger("dragenter")
        .trigger("dragover")
        .trigger("drop")
        cy.wait(500)
        cy.get('[class^=BurgerConstructor_components__').first().trigger("dragend");    
        cy.get('[class^=BurgerIngredients_ingredientsContainer__').last().
            children('li').eq(4).children('div').first().children('p').first().should($p=>{expect($p).to.have.text('2')})       
      

        cy.get('[class^=BurgerConstructor_components__').contains('Флюоресцентная булка')
        cy.get('[class^=BurgerConstructor_components__').contains('Филе Люминесцентного тетра')
        cy.get('[class^=BurgerConstructor_components__').contains('Сыр с астероидной плесенью')
        cy.get('[class^=BurgerConstructor_components__').contains('Хрустящие минеральные кольца')
    })


    it('should handle moving toppings via dnd', ()=>{
        cy.get('[class^=BurgerConstructor_componentsScrollable__').first().children('li').eq(0).children('div').first().trigger("dragstart").trigger("dragleave");
        cy.wait(500)
        cy.get('[class^=BurgerConstructor_componentsScrollable__').first().children('li').eq(3).children('div').last().trigger("dragenter")
            .trigger("dragover", {force: true})
            .trigger("drop", {force: true})
        cy.wait(500)
        cy.get('[class^=BurgerConstructor_componentsScrollable__').first().children('li').eq(3).children('div').last().trigger("dragend")
       
        cy.get('[class^=BurgerConstructor_componentsScrollable__').first().children('li').eq(2).contains('Сыр с астероидной плесенью')

    })    


    
    it('should handle deleting toppings', ()=>{
        cy.get('[class^=BurgerConstructor_componentsScrollable__').first().children('li').eq(1).children('div').last()
        .children('div').first().children('span').first().children('span').last().children('svg').click()
        cy.get('[class^=BurgerConstructor_componentsScrollable__').contains('Филе Люминесцентного тетра').should('not.exist')
        cy.get('[class^=BurgerIngredients_ingredientsContainer__').last().
            children('li').first().children('div').should('not.exist')
    })

})