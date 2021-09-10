// Creates the customer on form submission
$("#create_customer").on("submit", function(e) {
  e.preventDefault();
  // Replase LIST_ID - this sends the customer data to specific list and segment
  // var LIST_ID = "{ LIST_ID }";
  var LIST_ID = "SQrmiV";
  // Grab the form fields
  var email = $("input#email").val();
  var phone_number = $("input#phone_number").val();
  var firstname = $("input#firstname").val();
  var lastname = $("input#lastname").val();
  var storename = $("input#storename").val();

  var formData = {
    listId: LIST_ID,
    email: email,
    phone_number: phone_number,
    firstname: firstname,
    lastname: lastname,
    storename: storename
  };
  _learnq.push([
    "identify",
    {
      $email: email
    }
  ]);
  sendKlaviyoSubscribe(formData).then((res) => console.log(res));
});

function sendKlaviyoSubscribe(formData) {
  var settings = {
    async: true,
    crossDomain: true,
    url: "https://manage.kmail-lists.com/ajax/subscriptions/subscribe",
    method: "POST",
    headers: {
      "content-type": "application/x-www-form-urlencoded",
      "cache-control": "no-cache"
    },
    data: {
      g: formData.listId,
      email: formData.email,
      $fields: "$source, $phone_number, sms_consent, $first_name, $last_name, $store_name",
      $source: "WLC Form",
      $first_name: formData.firstname,
      $last_name: formData.lastname,
      $store_name: formData.storename,
      $phone_number: formData.phone_number,
      $consent_method: "Klaviyo Form",
      $consent_form_id: "Sbkr2K ",
      $consent_form_version: "74",
      sms_consent: true
    }
  };
  return $.ajax(settings)
    .done(function(response) {
      // Select and submit form after subscribing
      $("#create_customer").unbind().submit();
    })
    .fail((err) => {
      throw new Error(err);
    });
}