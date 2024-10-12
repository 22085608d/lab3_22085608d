$(document).ready(function () {
    let bookedTable = JSON.parse(localStorage.getItem("bookedTable")) || [];
    let selectedTableId = null;

    function UTS() {
        $(".table").each(function () {
            const tableId = $(this).attr("id");
            if (bookedTable.includes(tableId)) {
                $(this).addClass("booked");
            } else {
                $(this).removeClass("booked");
            }
        });
    }

    UTS();

    $(".table").click(function () {
        const tableId = $(this).attr("id");

        if (!$(this).hasClass("booked")) {
            selectedTableId = tableId;
            $("#selected-table").text(`You are picking: Table ${tableId.slice(1)}`);
            $("#booking-buttons").show();
        } else {
            $("#selected-table").text("This table is not available.");
            $("#booking-buttons").hide();
        }
    });

    $("#ok-btn").click(function () {
        if (selectedTableId) {
            bookedTable.push(selectedTableId);
            localStorage.setItem("bookedTable", JSON.stringify(bookedTable));
            UTS();
            $("#selected-table").text(`You have booked: Table ${selectedTableId.slice(1)}`);
            $("#booking-buttons").hide();
            selectedTableId = null;
        }
    });

    $("#cancel-btn").click(function () {
        $("#selected-table").text("Please select a table to book.");
        $("#booking-buttons").hide();
        selectedTableId = null;
    });
});