import { Component, EventEmitter, Input, OnDestroy, OnInit, Output, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSelect } from '@angular/material/select';
import { combineLatest, Observable, of, ReplaySubject, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { COUNTRIES, Country } from './countries.data';
import { CountrySelectorService } from './country-selector.service';
import { CountrySelectorConfig } from './country.selector.config';

@Component({
  selector: 'lib-country-selector',
  templateUrl: './country-selector.component.html',
  styleUrls: ['./country-selector.component.scss']
})
export class CountrySelectorComponent implements OnInit, OnDestroy {
  protected countries: Country[] = COUNTRIES;
  countryFilterCtrl: FormControl = new FormControl();
  filteredCountries: ReplaySubject<Country[]> = new ReplaySubject<Country[]>(1);
  @ViewChild('countrySelect', { static: true }) countrySelect: MatSelect | undefined;

  protected _onDestroy = new Subject<void>();

  country: string | undefined;

  countryFormGroup!: FormGroup;

  @Input()
  config: CountrySelectorConfig = {
    label: 'Country',
    selectPlaceHolder: 'Country',
    selectSearchNotFoundLabel: 'Not found',
    selectSearchPlaceholder: 'Search',
    requiredErrorMessage: 'Please select a country'
  };

  @Input() defaultValue$: Observable<string> = of('');
  @Input() requied: boolean = true;
  @Input() geoLookupEnabled = true;

  @Output() selectedCountry: EventEmitter<string> = new EventEmitter();

  constructor(private formBuilder: FormBuilder, private countrySelectorService: CountrySelectorService) {
    this.filteredCountries.next(this.countries.slice());

    this.countryFilterCtrl.valueChanges.pipe(takeUntil(this._onDestroy)).subscribe(() => {
      this.filterCountries();
    });
  }

  ngOnInit(): void {
    const validators = this.requied ? [Validators.required] : [];
    this.countryFormGroup = this.formBuilder.group({
      country: new FormControl('', validators)
    });
    combineLatest([this.countrySelectorService.getCountry(), this.defaultValue$]).subscribe(
      ([country, defaultValue]) => {
        const selectCountry = defaultValue || (this.geoLookupEnabled ? country : '');
        this.countryFormGroup?.get('country')?.setValue(selectCountry);
        this.onSelectChange(selectCountry);
      }
    );
  }

  protected filterCountries() {
    if (!this.countries) {
      return;
    }

    let search = this.countryFilterCtrl.value;
    if (!search) {
      this.filteredCountries.next(this.countries.slice());
      return;
    } else {
      search = search.toLowerCase();
    }

    this.filteredCountries.next(this.countries.filter(c => c.name.toLowerCase().indexOf(search) > -1));
  }

  onSelectChange(country: string) {
    this.selectedCountry.emit(country);
  }

  ngOnDestroy() {
    this._onDestroy.next(void 0);
    this._onDestroy.complete();
  }
}
