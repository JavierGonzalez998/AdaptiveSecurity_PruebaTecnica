from django.apps import AppConfig


class IpserviceConfig(AppConfig):
    default_auto_field = 'django.db.models.BigAutoField'
    name = 'ipService'
    
    def ready(self):
        import ipService.signals 