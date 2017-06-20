/**
 * Injects the CSRF token as header in every ajax request for this domain
 */
$.ajaxPrefilter(function(options, _, xhr) {
  if (!xhr.crossDomain) {
    var securityToken = $('meta[name="csrf-token"]').attr('content');
    xhr.setRequestHeader('X-CSRF-Token', securityToken);
  }
});
