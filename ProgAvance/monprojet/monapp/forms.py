from django import forms
from .models import Product, ProductAttribute, ProductItem

class ContactUsForm(forms.Form):
    name = forms.CharField(required=False)
    email = forms.EmailField()
    message = forms.CharField(max_length=1000)

class ProductForm(forms.ModelForm):
    class Meta:
        model = Product
        fields = '__all__'
        exclude = ('price_ttc', 'status')

class ItemForm(forms.ModelForm):
    class Meta:
        model = ProductItem
        fields = '__all__'

class AttributeForm(forms.ModelForm):
    
    class Meta :
        model = ProductAttribute
        fields = '__all__'