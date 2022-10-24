function Alert(type, title, body) {
  const alert = $("[element-type='alert']");
  const alert_title = $("[element-type='alert-title']");
  const alert_body = $("[element-type='alert-body']");
  alert.addClass({
    0: 'alert-primary', 
    1: 'alert-secondary', 
    2: 'alert-success',
    3: 'alert-danger', 
    4: 'alert-warning', 
    5: 'alert-info',
    6: 'alert-light', 
    7: 'alert-dark'
  }[type]);
  alert.removeClass('d-none');
  alert_title.text(title);
  alert_body.text(body);
}

$(function () {
  const confirmation = JSON.parse($("[element-type='output']").attr('data-value'));
  if (confirmation) {
    Alert(2, 'Sucesso!', `Parabéns! Sua conta foi ativada com sucesso.`);
  } else {
    Alert(4, 'Atenção!', `Este usuário não existe ou já foi ativado com êxito.`);
  }
});