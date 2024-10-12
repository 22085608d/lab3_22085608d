
        $(document).ready(function() {
            $.get("assets/drink-menu.json").done( function(data) {
                console.log("Fetched data:", data);
                var menuContainer = $("#drink-menu");
                menuContainer.empty(); 

                data.forEach(function(drink) {
                    var drinkItem = `
                        <div class="col">
                            <div class="card">
                                <img src="${drink.image}" class = "card-img-top" alt="${drink.name}">
                                <div class="card-body">
                                    <h5 class="card-title">${drink.name}</h5>
                                    <p class="card-text">Category: ${drink.type}</p>
                                    <p class="card-text">Price: $${drink.price}</p>
                                </div>
                            </div>
                        </div>
                    `;
                    menuContainer.append(drinkItem);
                });
            }).fail(function(jqXHR, textStatus, errorThrown){
                console.error("error fetch data: ",textStatus, errorThrown);
                var errorMessage = `
                    <div class = "alert alert-danger" role = "alert">
                        Failed to fetch drink menu. Please try again later. </div> 
                `;
                $("#drink-menu").html(errorMessage);
            });
        });

    